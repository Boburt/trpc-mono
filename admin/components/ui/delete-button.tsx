import { Button } from "@components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { DeleteIcon, Trash2Icon } from "lucide-react";

export function DeleteButton({
  recordId,
  deleteRecord,
}: {
  recordId: string;
  deleteRecord: any;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-center">Удалить</h4>
            <p className="text-sm text-muted-foreground text-center">
              Вы действительно хотите удалить эту запись?
            </p>
          </div>
          <div className="space-x-3 mx-auto">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                deleteRecord({
                  where: {
                    id: recordId,
                  },
                });
              }}
            >
              Удалить
            </Button>
            <PopoverClose aria-label="Close">
              <Button variant="secondary" size="sm">
                Отмена
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
