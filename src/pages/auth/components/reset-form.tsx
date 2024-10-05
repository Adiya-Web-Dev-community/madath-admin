import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/custom/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import axiosInstance from "@/api/client";
import { useToast } from "@/components/ui/use-toast"; // Import useToast
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { PasswordInput } from "@/components/custom/password-input";

// Zod schema for form validation
const resetSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function ResetPasswordForm({ token, className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/users/reset-password", {
        token,
        newPassword: data.newPassword,
      });

      // Show success toast
      toast({
        title: "Success",
        description: "Your password has been reset successfully.",
        variant: "success",
      });

      // Navigate to login page
      navigate("/sign-in");
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "An error occurred while resetting the password.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="New Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2 text-white" loading={isLoading}>
              Reset Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
