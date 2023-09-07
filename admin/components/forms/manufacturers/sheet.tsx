import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import ManufacturersForm from "./_form";

export default function ManufacturersFormSheet({
  children,
  recordId,
}: {
  children: React.ReactNode;
  recordId?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);

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
      <SheetContent className="w-1/3 sm:max-w-6xl">
        <SheetHeader>
          <SheetTitle>{recordId ? "Edit" : "Add"} Manufacturer</SheetTitle>
        </SheetHeader>
        {open && <ManufacturersForm setOpen={setOpen} recordId={recordId} />}
      </SheetContent>
    </Sheet>
  );
}
