import EditHotelPage from "@/components/modules/Admin/HotelManagement/EditHotelPage";
import { getHotelById } from "@/services/hotel/hotel";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hotel = await getHotelById(id);

  return <EditHotelPage hotel={hotel} />;
}
