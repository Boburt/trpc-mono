import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export const KanbanCard = ({
  title,
  index,
  parent,
}: {
  title: string;
  index: string;
  parent: string;
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
      className="flex flex-col p-1 bg-white m-1 rounded-lg border-2 border-gray-500 shadow-md"
      style={{
        transform: style.transform,
      }}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      <div>{title}</div>
    </div>
  );
};
