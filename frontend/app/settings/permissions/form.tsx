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
import { Loader2 } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@components/ui/use-toast";
import { permissionsCreateInputSchema } from "@backend/lib/zod";
import {
  usePermissionsCreate,
  usePermissionsUpdate,
} from "@frontend/store/permission";

export default function PermissionsForm({
  children,
  recordId,
}: {
  children: React.ReactNode;
  recordId?: string;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof permissionsCreateInputSchema>>({
    resolver: zodResolver(permissionsCreateInputSchema),
    defaultValues: {
      active: true,
      slug: "",
      description: "",
    },
  });

  const {
    mutateAsync: createPermission,
    isLoading: isAddLoading,
    data,
    error,
  } = usePermissionsCreate({});

  const {
    mutateAsync: updatePermission,
    isLoading: isUpdateLoading,
    error: updateError,
  } = usePermissionsUpdate({});

  const { data: record, isLoading: isRecordLoading } =
    trpc.permissions.one.useQuery(
      {
        where: { id: recordId },
      },
      {
        enabled: recordId && open,
        refetchOnMountOrArgChange: true,
      }
    );

  const isLoading = useMemo(() => {
    return isAddLoading || isUpdateLoading;
  }, [isAddLoading, isUpdateLoading]);

  useEffect(() => {
    if (data) {
      toast({
        title: "Success",
        description: "Permission added",
        duration: 5000,
      });
      form.reset();
      setOpen(false);
    }

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
        duration: 5000,
      });
    }

    if (updateError) {
      toast({
        title: "Error",
        description: updateError.message,
        variant: "destructive",
        duration: 5000,
      });
    }

    if (record) {
      form.setValue("active", record.active);
      form.setValue("slug", record.slug);
      form.setValue("description", record.description);
    }

    return () => {
      form.reset();
    };
  }, [data, error, updateError, record, open]);

  async function onSubmit(
    values: z.infer<typeof permissionsCreateInputSchema>
  ) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    setTimeout(() => {
      setOpen(false);
    }, 1000);

    if (recordId) {
      updatePermission({ data: values, where: { id: recordId } });
    } else {
      createPermission({ data: values });
    }
  }

  const beforeOpen = async (open: boolean) => {
    if (open) {
      // Do something before the sheet opens.
      setOpen(true);
      if (recordId) {
        // const record = await trpc.permissions.one.query({ id: recordId });
        // form.setValue("active", record.active);
        // form.setValue("slug", record.slug);
        // form.setValue("description", record.description);
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
