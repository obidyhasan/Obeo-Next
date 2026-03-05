import { getHotels } from "@/services/hotel/hotel";
import HotelsPage from "@/components/modules/Admin/HotelManagement/HotelsPage";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/shared/Skeletons/DataTableSkeleton";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const hotels = await getHotels(currentPage);

  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <HotelsPage hotels={hotels} />
    </Suspense>
  );
}
