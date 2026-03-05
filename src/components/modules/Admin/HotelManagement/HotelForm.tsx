/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createHotel, updateHotel } from "@/services/hotel/hotel";
import { useState } from "react";
import { Separator } from "../../../ui/separator";
import { FormField } from "@/components/ui/form-field";
import { hotelSchema } from "@/zod/HotelSchema";

type HotelFormValues = z.infer<typeof hotelSchema>;

interface HotelFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export function HotelForm({ initialData, isEditing = false }: HotelFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<HotelFormValues>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      name: initialData?.name || "",
      type: initialData?.type || "LOW",
      subdomain: initialData?.subdomain || "",
      authorityName: initialData?.authorityName || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      password: "",
      remarks: initialData?.remarks || "",
      address: {
        street: initialData?.hotelAddress?.street || "",
        city: initialData?.hotelAddress?.city || "",
        state: initialData?.hotelAddress?.state || "",
        country: initialData?.hotelAddress?.country || "",
        zipCode: initialData?.hotelAddress?.zipCode || "",
      },
    },
  });

  async function onSubmit(data: HotelFormValues) {
    setIsSubmitting(true);
    const toastId = toast.loading(
      isEditing ? "Updating hotel..." : "Creating hotel...",
    );

    try {
      let res;
      if (isEditing) {
        const { password, ...updateData } = data;
        res = await updateHotel(initialData.id, updateData);
      } else {
        res = await createHotel(data);
      }

      if (res.success) {
        toast.success(
          res.message ||
          (isEditing
            ? "Hotel updated successfully"
            : "Hotel created successfully"),
          {
            id: toastId,
          },
        );
        router.push("/admin/hotels");
        router.refresh();
      } else {
        toast.error(res.message || "Something went wrong", { id: toastId });
      }
    } catch (error) {
      toast.error("An unexpected error occurred", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 w-full p-4 lg:p-6 bg-background rounded-lg border"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <FormField name="name" control={form.control} label="Hotel Name" placeholder="Enter hotel name" />

        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Hotel Type</FieldLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">LOW</SelectItem>
                  <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                  <SelectItem value="HIGH">HIGH</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FormField name="subdomain" control={form.control} label="Subdomain" placeholder="Enter subdomain" disabled={isEditing} />

        <FormField name="authorityName" control={form.control} label="Authority Name" placeholder="Enter authority name" />

        <FormField name="email" control={form.control} label="Email" type="email" placeholder="Enter email" disabled={isEditing} />

        <FormField name="phone" control={form.control} label="Phone" placeholder="Enter phone number" />

        {!isEditing && (
          <FormField name="password" control={form.control} label="Password" type="password" placeholder="Enter password" />
        )}
      </div>

      <Separator />
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <FormField name="address.street" control={form.control} label="Street" placeholder="Enter street" />
          <FormField name="address.city" control={form.control} label="City" placeholder="Enter city" />
          <FormField name="address.state" control={form.control} label="State" placeholder="Enter state" />
          <FormField name="address.country" control={form.control} label="Country" placeholder="Enter country" />
          <FormField name="address.zipCode" control={form.control} label="Zip Code" placeholder="Enter zip code" />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" type="button" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : isEditing
              ? "Update Hotel"
              : "Create Hotel"}
        </Button>
      </div>
    </form>
  );
}
