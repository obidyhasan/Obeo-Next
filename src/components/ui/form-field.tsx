"use client";

import {
    Controller,
    Control,
    FieldValues,
    Path,
    RegisterOptions,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ComponentProps } from "react";

interface FormFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    disabled?: boolean;
    rules?: RegisterOptions<T, Path<T>>;
    inputProps?: ComponentProps<typeof Input>;
}

export function FormField<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    type = "text",
    required = false,
    disabled = false,
    rules,
    inputProps,
}: FormFieldProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>{label}</FieldLabel>
                    <Input
                        {...field}
                        {...inputProps}
                        type={type}
                        required={required}
                        disabled={disabled}
                        placeholder={placeholder}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}
