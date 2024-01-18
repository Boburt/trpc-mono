import { DndContext, rectIntersection } from "@dnd-kit/core";
import KanbanLane from "./KanbanLane";
import { useMemo, useState } from "react";
import { SpTicketsRelatedList } from "@backend/modules/sp_tickets/sp_tickets.dto";
import { $accessToken } from "@frontend/src/store/auth";
import { useStore } from "@nanostores/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@frontend/src/utils/eden";
import { Spinner } from "@nextui-org/spinner";
import { toast } from "sonner";

export default function KanbanBoard() {
  const accessToken = useStore($accessToken);
  const queryClient = useQueryClient();

  const { data: spTicketsStatuses, isLoading } = useQuery({
    enabled: !!accessToken,
    queryKey: ["sp_ticket_statuses_cached"],
    queryFn: async () => {
      const { data } = await apiClient.api.sp_ticket_statuses.cached.get({
        $headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: (newTodo: {
      data: {
        status_id: string;
      };
      id: string;
    }) => {
      return apiClient.api.sp_tickets[newTodo.id].put({
        data: newTodo.data,
        fields: ["id", "slug", "description", "active"],
        $headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sp_ticket_tickets"],
      });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const isDataLoading = useMemo(() => {
    return isLoading;
  }, [isLoading]);

  if (isDataLoading) {
    return <Spinner label="Загрузка..." color="primary" />;
  } else {
    return (
      <DndContext
        collisionDetection={rectIntersection}
        onDragEnd={(e) => {
          const statusId = e.over?.id;
          const id = e.active.data.current?.index ?? "";
          console.log(e);
          if (statusId && id) {
            updateMutation.mutate({
              data: {
                status_id: statusId.toString(),
              },
              id,
            });
          }
          // if (container === "ToDo") {
          //     setTodoItems([...todoItems, { title }]);
          // } else if (container === "Done") {
          //     setDoneItems([...doneItems, { title }]);
          // } else if (container === "Unassigned") {
          //     setuItems([...uItems, { title }]);
          // } else {
          //     setInProgressItems([...inProgressItems, { title }]);
          // }
          // if (parent === "ToDo") {
          //     setTodoItems([
          //         ...todoItems.slice(0, index),
          //         ...todoItems.slice(index + 1),
          //     ]);
          // } else if (parent === "Done") {
          //     setDoneItems([
          //         ...doneItems.slice(0, index),
          //         ...doneItems.slice(index + 1),
          //     ]);
          // } else if (parent === "Unassigned") {
          //     setuItems([...uItems.slice(0, index), ...uItems.slice(index + 1)]);
          // } else {
          //     setInProgressItems([
          //         ...inProgressItems.slice(0, index),
          //         ...inProgressItems.slice(index + 1),
          //     ]);
          // }
        }}
      >
        <div className="flex">
          {Array.isArray(spTicketsStatuses) &&
            spTicketsStatuses?.map((status) => <KanbanLane status={status} />)}
        </div>
      </DndContext>
    );
  }
}
