import { SubdomainHotelLoginForm } from "./SubdomainHotelLoginForm";

interface SubdomainHotelLoginProps {
    subdomain: string;
}

const SubdomainHotelLogin = ({ subdomain }: SubdomainHotelLoginProps) => {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <SubdomainHotelLoginForm subdomain={subdomain} />
            </div>
        </div>
    );
};

export default SubdomainHotelLogin;
