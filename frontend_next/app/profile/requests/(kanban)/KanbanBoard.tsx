"use client";
import { DndContext, rectIntersection } from "@dnd-kit/core";
import KanbanLane from "./KanbanLane";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@frontend_next/lib/eden";
import { Spinner } from "@nextui-org/spinner";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function KanbanBoard() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: spTicketsStatuses, isLoading } = useQuery({
    enabled: !!session?.accessToken,
    queryKey: ["sp_ticket_statuses_cached"],
    queryFn: async () => {
      const { data } = await apiClient.api.sp_ticket_statuses.cached.get({
        headers: {
          Authorization: `Bearer ${session!.accessToken!}`,
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
      return apiClient.api.sp_tickets({ id: newTodo.id }).put(
        {
          data: newTodo.data,
          fields: ["id", "slug", "description", "active"],
        },
        {
          headers: {
            Authorization: `Bearer ${session!.accessToken!}`,
          },
        }
      );
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
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Spinner label="Загрузка..." color="primary" />
      </div>
    );
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
            spTicketsStatuses?.map((status) => (
              <KanbanLane key={status.id} status={status} />
            ))}
        </div>
      </DndContext>
    );
  }
}
