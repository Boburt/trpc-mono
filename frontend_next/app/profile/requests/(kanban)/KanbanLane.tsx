import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./KanbanCard";
import { sp_ticket_statuses } from "backend/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@frontend_next/lib/eden";
import { Spinner } from "@nextui-org/spinner";
import { useSession } from "next-auth/react";

interface KanbanLaneProps {
  // @ts-ignore
  status: InferSelectModel<typeof sp_ticket_statuses>;
}

export default function KanbanLane({ status }: KanbanLaneProps) {
  const { data: session } = useSession();
  const { setNodeRef } = useDroppable({
    id: status.id,
  });

  const { data, isLoading } = useQuery({
    enabled: !!session?.accessToken,
    queryKey: ["sp_ticket_tickets", status.id],
    queryFn: async () => {
      const { data } = await apiClient.api.sp_tickets.get({
        query: {
          limit: "50",
          offset: "0",
          fields:
            "id,name,created_at,sp_ticket_categories.name,sp_ticket_statuses.name,sp_ticket_statuses.color",
          filters: JSON.stringify([
            {
              field: "sp_ticket_statuses.id",
              operator: "eq",
              value: status.id,
            },
          ]),
        },
        headers: {
          Authorization: `Bearer ${session!.accessToken!}`,
        },
      });
      return data;
    },
  });

  return (
    <div className="flex flex-col flex-[3] m-1 min-h-40 bg-gray-200 space-x-2 rounded-md">
      <div
        className="font-bold text-xl mb-3 py-3 rounded-md shadow-md px-2 text-white"
        style={{
          backgroundColor: status.color!,
        }}
      >
        {status.name}
      </div>
      <div className="flex flex-1 flex-col p-1" ref={setNodeRef}>
        {isLoading && <Spinner label="Загрузка..." color="primary" />}
        {Array.isArray(data?.data) && data?.data.length === 0 && (
          <div className="text-center text-gray-500">Нет заявок</div>
        )}
        {Array.isArray(data?.data) && data?.data.length > 0 && (
          <>
            {data.data.map((item) => (
              <KanbanCard
                title={item.name}
                key={item.id}
                index={item.id}
                parent={status.id}
                item={item}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
