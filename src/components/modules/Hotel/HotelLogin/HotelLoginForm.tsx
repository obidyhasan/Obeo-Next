import { hotelLogin } from "@/services/auth/login";
import { AuthForm } from "../../Auth/AuthForm";

export function HotelLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <AuthForm
      {...props}
      className={className}
      type="hotel"
      title="Login to your Hotel PMS account"
      onSubmitAction={hotelLogin}
    />
  );
}

