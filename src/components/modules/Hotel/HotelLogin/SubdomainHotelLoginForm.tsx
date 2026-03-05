import { hotelLogin } from "@/services/auth/login";
import { AuthForm } from "../../Auth/AuthForm";

interface SubdomainHotelLoginFormProps extends React.ComponentProps<"div"> {
  subdomain: string;
}

export function SubdomainHotelLoginForm({
  className,
  subdomain,
  ...props
}: SubdomainHotelLoginFormProps) {
  return (
    <AuthForm
      {...props}
      className={className}
      type="subdomain"
      subdomain={subdomain}
      title={
        <p className="text-balance capitalize">
          Login to <span className="font-semibold">{subdomain}</span> Hotel PMS
        </p>
      }
      onSubmitAction={hotelLogin}
    />
  );
}

