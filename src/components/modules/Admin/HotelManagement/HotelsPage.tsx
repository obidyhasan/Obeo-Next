/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GenericDataTable } from "@/components/shared/DataTable/generic-data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteHotel } from "@/services/hotel/hotel";
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

const HotelsPage = ({ hotels }: { hotels: any }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [headerToDelete, setHeaderToDelete] = useState<string | null>(null);

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/admin/hotels?${params.toString()}`);
  };

  const onDelete = async () => {
    if (!headerToDelete) return;

    const result = await deleteHotel(headerToDelete);
    if (result.success) {
      toast.success("Hotel deleted successfully");
      router.push("/admin/hotels");
      router.refresh();
    } else {
      toast.error(result.message || "Failed to delete hotel");
    }
    setIsDeleteDialogOpen(false);
    setHeaderToDelete(null);
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Hotel Name",
    },
    {
      accessorKey: "subdomain",
      header: "Subdomain",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.subdomain}.obeopms.com</Badge>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant={row.original.type === "HIGH" ? "default" : "secondary"}>
          {row.original.type}
        </Badge>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const hotel = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <IconDotsVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/admin/hotels/${hotel.id}/edit`}>
                  <IconEdit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => {
                  setHeaderToDelete(hotel.id);
                  setIsDeleteDialogOpen(true);
                }}
              >
                <IconTrash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="flex flex-1 flex-col py-4">
      <GenericDataTable
        columns={columns}
        data={hotels?.data?.data || []}
        searchKey="name"
        addNewLink="/admin/hotels/new"
        addNewLabel="Add Hotel"
        pageCount={hotels?.data?.meta?.totalPages || 1}
        pageIndex={currentPage - 1}
        onPageChange={onPageChange}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              hotel and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HotelsPage;
