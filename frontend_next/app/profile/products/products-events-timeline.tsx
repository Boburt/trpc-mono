import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@frontend_next/lib/eden";
import { useSession } from "next-auth/react";
import { TimelineLayout } from "@frontend_next/components/timeline/timeline-layout";

export const ProductEventsTimeline: React.FC<{
  productId: string;
  created_at: string;
}> = ({ productId, created_at }) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["productEvents", productId],
    queryFn: async () => {
      const { data } = await apiClient.api.product_events({ productId }).post(
        {
          created_at,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return data;
    },
  });

  const timeLineEvents = useMemo(() => {
    if (events && Array.isArray(events)) {
      return events?.map((event) => ({
        date: new Date(event.created_at).toLocaleString(),
        title: event.event_name,
      }));
    } else {
      return [];
    }
  }, [events]);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Возникла ошибка при получении списка событий</div>;

  return <TimelineLayout items={timeLineEvents} />;
};
