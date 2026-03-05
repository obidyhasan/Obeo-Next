"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconChevronDown, IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconLayoutColumns, IconPlus } from "@tabler/icons-react";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey?: string;
    addNewLink?: string;
    addNewLabel?: string;
    pageCount?: number;
    pageIndex?: number;
    onPageChange?: (page: number) => void;
}

export function GenericDataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    addNewLink,
    addNewLabel = "Add New",
    pageCount,
    pageIndex = 0,
    onPageChange,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        pageCount: pageCount ?? -1,
        manualPagination: !!pageCount,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination: {
                pageIndex,
                pageSize: 10,
            },
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
        <div className="space-y-4 px-4 lg:px-6">
            <div className="flex items-center justify-between gap-2">
                <div className="flex flex-1 items-center space-x-2">
                    {searchKey && (
                        <Input
                            placeholder={`Filter ${searchKey}...`}
                            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn(searchKey)?.setFilterValue(event.target.value)
                            }
                            className="h-8 w-[150px] lg:w-[250px]"
                        />
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <IconLayoutColumns className="mr-2 h-4 w-4" />
                                <span className="hidden lg:inline">Columns</span>
                                <IconChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[150px]">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) =>
                                        typeof column.accessorFn !== "undefined" &&
                                        column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {addNewLink && (
                        <Button asChild size="sm">
                            <Link href={addNewLink}>
                                <IconPlus className="mr-2 h-4 w-4" />
                                {addNewLabel}
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row">
                <div className="flex-1 text-sm text-zinc-400 order-2 md:order-1">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex items-center space-x-2 order-1 md:order-2">
                    <div className="flex items-center space-x-1">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => onPageChange ? onPageChange(1) : table.setPageIndex(0)}
                            disabled={onPageChange ? pageIndex === 0 : !table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to first page</span>
                            <IconChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => onPageChange ? onPageChange(pageIndex) : table.previousPage()}
                            disabled={onPageChange ? pageIndex === 0 : !table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <IconChevronLeft className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-1">
                        {(() => {
                            const total = pageCount || table.getPageCount();
                            const current = pageIndex + 1;
                            const pages = [];

                            // Simple pagination logic: show current, prev, and next if they exist
                            if (total <= 5) {
                                for (let i = 1; i <= total; i++) pages.push(i);
                            } else {
                                if (current <= 3) {
                                    pages.push(1, 2, 3, 4, '...', total);
                                } else if (current >= total - 2) {
                                    pages.push(1, '...', total - 3, total - 2, total - 1, total);
                                } else {
                                    pages.push(1, '...', current - 1, current, current + 1, '...', total);
                                }
                            }

                            return pages.map((p, i) => (
                                <React.Fragment key={i}>
                                    {p === '...' ? (
                                        <span className="px-2 text-zinc-500">...</span>
                                    ) : (
                                        <Button
                                            variant={current === p ? "default" : "outline"}
                                            className={`h-8 w-8 p-0 ${current !== p ? "hidden sm:flex" : "flex"}`}
                                            onClick={() => onPageChange ? onPageChange(p as number) : table.setPageIndex((p as number) - 1)}
                                        >
                                            {p}
                                        </Button>
                                    )}
                                </React.Fragment>
                            ));
                        })()}
                    </div>

                    <div className="flex items-center space-x-1">
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => onPageChange ? onPageChange(pageIndex + 2) : table.nextPage()}
                            disabled={onPageChange ? (pageCount ? pageIndex + 1 >= pageCount : true) : !table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            <IconChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => onPageChange ? onPageChange(pageCount || table.getPageCount()) : table.setPageIndex(table.getPageCount() - 1)}
                            disabled={onPageChange ? (pageCount ? pageIndex + 1 >= pageCount : true) : !table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to last page</span>
                            <IconChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}
