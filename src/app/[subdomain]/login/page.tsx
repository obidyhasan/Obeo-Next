import SubdomainHotelLogin from "@/components/modules/Hotel/HotelLogin/SubdomainHotelLogin";

interface PageProps {
  params: Promise<{ subdomain: string }>;
}

const page = async ({ params }: PageProps) => {
  const { subdomain } = await params;
  return (
    <div>
      <SubdomainHotelLogin subdomain={subdomain} />
    </div>
  );
};

export default page;
