import { adminLogin } from "@/services/auth/login";
import { AuthForm } from "../../Auth/AuthForm";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <AuthForm
      {...props}
      className={className}
      type="admin"
      title="Login to your Obeo PMS account"
      onSubmitAction={adminLogin}
    />
  );
}

