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
import { useState, useMemo, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@components/ui/use-toast";
import { PermissionsCreateInputSchema } from "@backend/lib/zod";
import {
  usePermissionsCreate,
  usePermissionsUpdate,
} from "@admin/store/apis/permission";

export default function PermissionsForm({
  children,
  recordId,
}: {
  children: React.ReactNode;
  recordId?: string;
}) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof PermissionsCreateInputSchema>>({
    resolver: zodResolver(PermissionsCreateInputSchema),
    defaultValues: {
      active: true,
      slug: "",
      description: "",
    },
  });

  const onAddSuccess = (actionText: string) => {
    toast({
      title: "Success",
      description: `Permission ${actionText}`,
      duration: 5000,
    });
    form.reset();
    setOpen(false);
  };

  const onError = (error: any) => {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
      duration: 5000,
    });
  };

  const {
    mutateAsync: createPermission,
    isLoading: isAddLoading,
    data,
    error,
  } = usePermissionsCreate({
    onSuccess: () => onAddSuccess("added"),
    onError,
  });

  const {
    mutateAsync: updatePermission,
    isLoading: isUpdateLoading,
    error: updateError,
  } = usePermissionsUpdate({
    onSuccess: () => onAddSuccess("updated"),
    onError,
  });

  const { data: record, isLoading: isRecordLoading } =
    trpc.permissions.one.useQuery(
      {
        where: { id: recordId },
      },
      {
        enabled: !!recordId && open,
      }
    );

  const isLoading = useMemo(() => {
    return isAddLoading || isUpdateLoading;
  }, [isAddLoading, isUpdateLoading]);

  // useEffect(() => {
  //   if (record) {
  //     form.setValue("active", record.active);
  //     form.setValue("slug", record.slug);
  //     form.setValue("description", record.description);
  //   }

  //   return () => {
  //     form.reset();
  //   };
  // }, [record, open, form]);

  async function onSubmit(
    values: z.infer<typeof PermissionsCreateInputSchema>
  ) {
    if (recordId) {
      startTransition(() => {
        updatePermission({ data: values, where: { id: recordId } });
      });
    } else {
      startTransition(() => {
        createPermission({ data: values });
      });
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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{recordId ? "Edit" : "Add"} Permissions</SheetTitle>
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
              {/* <FormField
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
              /> */}
              {/* <FormField
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
              /> */}
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
