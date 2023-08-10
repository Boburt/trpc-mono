"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { Button } from "@frontend/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@frontend/components/ui/form";
import { Input } from "@frontend/components/ui/input";
import { Switch } from "@frontend/components/ui/switch";
import { trpc } from "@frontend/utils/trpc";

import { zodResolver } from "@hookform/resolvers/zod";
import { permissionsMutation } from "@lib/zod_objects/permissions/z_objects";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@components/ui/use-toast";

export default function PermissionsForm({
  children,
  recordId,
}: {
  children: React.ReactNode;
  recordId?: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof permissionsMutation>>({
    resolver: zodResolver(permissionsMutation),
    defaultValues: {
      active: true,
      slug: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof permissionsMutation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setOpen(false);
    }, 1000);

    try {
      if (recordId) {
        const res = await trpc.permissions.renew.mutate({
          ...values,
          id: recordId,
        });
        console.log(res);
      } else {
        const res = await trpc.permissions.add.mutate(values);
      }
      form.reset();
      setIsLoading(false);
      setOpen(false);
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
        duration: 5000,
      });
    }
  }

  const beforeOpen = async (open: boolean) => {
    if (open) {
      // Do something before the sheet opens.
      setOpen(true);
      if (recordId) {
        const record = await trpc.permissions.one.query({ id: recordId });
        form.setValue("active", record.active);
        form.setValue("slug", record.slug);
        form.setValue("description", record.description);
      }
    } else {
      form.reset();
      setOpen(false);
    }
  };

  return (
    <Sheet onOpenChange={beforeOpen} open={open}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Активность</FormLabel>
                    <FormControl>
                      <div>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Код</FormLabel>
                    <FormControl>
                      <div>
                        <Input {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описание</FormLabel>
                    <FormControl>
                      <div>
                        <Input {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
