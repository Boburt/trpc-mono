"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Switch } from "@components/ui/switch";
import { trpc } from "@admin/utils/trpc";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@components/ui/use-toast";
import { RolesCreateInputSchema } from "@backend/lib/zod";
import { useRolesCreate, useRolesUpdate } from "@admin/store/apis/roles";

export default function RolesForm({
  children,
  recordId,
}: {
  children: React.ReactNode;
  recordId?: string;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof RolesCreateInputSchema>>({
    resolver: zodResolver(RolesCreateInputSchema),
    defaultValues: {
      active: true,
      name: "",
      code: "",
    },
  });

  const onAddSuccess = (actionText: string) => {
    toast({
      title: "Success",
      description: `Role ${actionText}`,
      duration: 5000,
    });
    form.reset();
    setOpen(false);
  };

  const onError = (error) => {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
      duration: 5000,
    });
  };

  const {
    mutateAsync: createRole,
    isLoading: isAddLoading,
    data,
    error,
  } = useRolesCreate({
    onSuccess: () => onAddSuccess("added"),
    onError,
  });

  const {
    mutateAsync: updateRole,
    isLoading: isUpdateLoading,
    error: updateError,
  } = useRolesUpdate({
    onSuccess: () => onAddSuccess("updated"),
    onError,
  });

  const { data: record, isLoading: isRecordLoading } = trpc.roles.one.useQuery(
    {
      where: { id: recordId },
    },
    {
      enabled: !!recordId && open,
      refetchOnMountOrArgChange: true,
    }
  );

  const isLoading = useMemo(() => {
    return isAddLoading || isUpdateLoading;
  }, [isAddLoading, isUpdateLoading]);

  useEffect(() => {
    if (record) {
      form.setValue("active", record.active);
      form.setValue("name", record.name);
      form.setValue("code", record.code);
    }

    return () => {
      form.reset();
    };
  }, [record, open]);

  async function onSubmit(
    values: z.infer<typeof permissionsCreateInputSchema>
  ) {
    if (recordId) {
      updateRole({ data: values, where: { id: recordId } });
    } else {
      createRole({ data: values });
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
      setOpen(false);
    }
  };

  return (
    <Sheet onOpenChange={beforeOpen} open={open}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>{recordId ? "Edit" : "Add"} Role</SheetTitle>
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
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
                name="code"
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
