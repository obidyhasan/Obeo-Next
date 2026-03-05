/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { HotelForm } from "@/components/modules/Admin/HotelManagement/HotelForm";

const NewHotelPage = () => {
  return (
    <div className="flex flex-1 flex-col p-4 lg:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Add New Hotel</h1>
        <p className="text-muted-foreground">
          Fill in the details to register a new hotel.
        </p>
      </div>
      <HotelForm />
    </div>
  );
};

export default NewHotelPage;
