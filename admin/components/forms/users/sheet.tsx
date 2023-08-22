import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import UsersForm from "./_form";

export default function UsersFormSheet({
  children,
  recordId,
}: {
  children: React.ReactNode;
  recordId?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const beforeOpen = async (open: boolean) => {
    if (open) {
      setOpen(true);
      if (recordId) {
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
          <SheetTitle>{recordId ? "Edit" : "Add"} Users</SheetTitle>
        </SheetHeader>
        {open && <UsersForm setOpen={setOpen} recordId={recordId} />}
      </SheetContent>
    </Sheet>
  );
}
