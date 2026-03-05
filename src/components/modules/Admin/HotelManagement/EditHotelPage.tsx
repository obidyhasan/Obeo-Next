/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { HotelForm } from "@/components/modules/Admin/HotelManagement/HotelForm";

const EditHotelPage = ({ hotel }: { hotel: any }) => {
  return (
    <div className="flex flex-1 flex-col p-4 lg:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Edit Hotel</h1>
        <p className="text-muted-foreground">
          Update the details of the hotel.
        </p>
      </div>
      {hotel?.data && (
        <HotelForm initialData={hotel.data} isEditing={true} />
      )}
    </div>
  );
};

export default EditHotelPage;
