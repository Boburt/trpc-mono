import { SpTicketsRelatedList } from "@backend/modules/sp_tickets/sp_tickets.dto";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import dayjs from "dayjs";

export const KanbanCard = ({
  title,
  index,
  parent,
  item,
}: {
  title: string;
  index: string;
  parent: string;
  item: SpTicketsRelatedList;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: title,
    data: {
      title,
      index,
      parent,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div
      className="flex flex-col p-2 bg-white m-1 rounded-lg border-2 border-gray-500 shadow-md"
      style={{
        transform: style.transform,
      }}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      <div>
        <a
          href={`/profile/requests/${item.id}`}
          className="font-semibold hover:underline-offset-2 hover:underline hover:text-primary-500"
        >
          {title}
        </a>
        <div className="flex justify-end">
          <div className="text-sm text-gray-400">
            {dayjs(item.created_at).format("DD.MM.YYYY")}
          </div>
        </div>
      </div>
    </div>
  );
};
