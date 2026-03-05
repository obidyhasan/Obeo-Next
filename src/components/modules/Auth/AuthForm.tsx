"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { FormField } from "@/components/ui/form-field";
import Image from "next/image";
import Link from "next/link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { decodeJwt } from "jose";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface AuthFormProps extends Omit<React.ComponentProps<"div">, "title"> {
  title: React.ReactNode;

  type: "admin" | "hotel" | "subdomain";
  subdomain?: string;
  onSubmitAction: (data: LoginFormValues) => Promise<any>;
}

export function AuthForm({
  className,
  title,
  type,
  subdomain,
  onSubmitAction,
  ...props
}: AuthFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    const toastId = toast.loading("Signing in, please wait...");

    try {
      const res = await onSubmitAction(data);

      if (res.success || res.accessToken || res.data?.accessToken) {
        setIsSubmitting(true);
        toast.success(res.message || "Logged in successfully!", {
          id: toastId,
        });

        const accessToken =
          res.data?.accessToken ||
          res.accessToken ||
          res.token ||
          res.data?.token;
        const refreshToken =
          res.data?.refreshToken || res.refreshToken || res.refresh_token;

        let userSubdomain =
          res.data?.subdomain ||
          res.subdomain ||
          res.user?.subdomain ||
          res.data?.user?.subdomain;

        if (!userSubdomain && accessToken) {
          try {
            const decoded = decodeJwt(accessToken) as { subdomain?: string };
            userSubdomain = decoded.subdomain;
          } catch (e) {}
        }

        // Subdomain restriction for direct hotel access
        console.log(accessToken);
        if (
          type === "subdomain" &&
          userSubdomain &&
          userSubdomain !== subdomain
        ) {
          toast.error("Account not associated with this hotel.", {
            id: toastId,
          });
          setIsSubmitting(false);
          return;
        }

        if (accessToken) {
          const port = window.location.port;
          const isProduction = !window.location.hostname.includes("localhost");
          const rootDomain = isProduction ? "obeopms.com" : "localhost";

          let targetHost = window.location.host;
          if (type === "hotel" && userSubdomain) {
            targetHost = `${userSubdomain}.${rootDomain}${port ? `:${port}` : ""}`;
          }

          const callbackUrl = new URL(
            `${window.location.protocol}//${targetHost}/api/auth/callback`,
          );
          callbackUrl.searchParams.set("accessToken", accessToken);
          if (refreshToken)
            callbackUrl.searchParams.set("refreshToken", refreshToken);
          callbackUrl.searchParams.set("redirect", "/dashboard");

          setTimeout(() => {
            window.location.replace(callbackUrl.toString());
          }, 600);
        } else {
          toast.error("Login failed: Authentication token missing.", {
            id: toastId,
          });
          setIsSubmitting(false);
        }
      } else {
        toast.error(res.message || "Invalid credentials.", { id: toastId });
        setIsSubmitting(false);
      }
    } catch (err) {
      toast.error("Connection failed. Please check your network.", {
        id: toastId,
      });
      setIsSubmitting(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f172b]/80 backdrop-blur-sm transition-opacity">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#386372] border-t-transparent"></div>
          <p className="mt-4 text-lg font-medium text-white">
            Redirecting to dashboard...
          </p>
        </div>
      )}
      <Card className="overflow-hidden p-0 shadow-none bg-[#0f172b] text-white">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
            <Link href={"/"}>
              <Image
                src={"/obeo.png"}
                alt="Obeo Logo"
                width={90}
                height={90}
                priority
                className="mx-auto"
              />
            </Link>
            <FieldGroup>
              <div className="mt-1 flex flex-col items-center gap-1 text-center">
                <p className="text-balance">{title}</p>
              </div>

              <FormField
                name="email"
                control={form.control}
                label="Email"
                type="email"
                placeholder="email@example.com"
                required
              />
              <FormField
                name="password"
                control={form.control}
                label="Password"
                type="password"
                placeholder="Enter your password"
                required
              />

              <Button
                disabled={isSubmitting}
                type="submit"
                className="bg-[#386372] w-full mt-4"
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </Button>

              {type === "subdomain" && (
                <p className="text-center text-sm text-zinc-400">
                  Not your hotel?{" "}
                  <Link
                    href={`http://localhost:3000/login`}
                    className="underline hover:text-white transition-colors"
                  >
                    Go to main login
                  </Link>
                </p>
              )}
            </FieldGroup>
          </form>

          <div className="bg-muted relative hidden md:block">
            <Image
              src="/login-cover.png"
              alt="Login Cover"
              width={1000}
              height={1000}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
