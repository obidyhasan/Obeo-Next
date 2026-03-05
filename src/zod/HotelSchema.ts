import z from "zod";

const hotelAddressSchema = z.object({
    street: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.string().optional(),
    country: z.string().min(2, "Country is required"),
    zipCode: z.string().optional(),
});

export const hotelSchema = z.object({
    name: z.string().min(2, "Hotel name must be at least 2 characters"),
    type: z.enum(["LOW", "MEDIUM", "HIGH"]),
    subdomain: z
        .string()
        .min(3, "Subdomain must be at least 3 characters")
        .regex(/^[a-z0-9-]+$/, "Subdomain must be lowercase with hyphens only"),
    authorityName: z.string().min(2, "Authority name is required"),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters").optional().or(z.literal("")),
    remarks: z.string().optional(),
    address: hotelAddressSchema,
});