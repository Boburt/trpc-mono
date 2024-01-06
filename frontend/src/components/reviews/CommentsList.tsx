import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/ru";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@frontend/src/utils/eden";

dayjs.locale("ru");
dayjs.extend(relativeTime);

export const ManufacturersReviewsList = ({
  manufacturerId,
}: {
  manufacturerId: string;
}) => {
  const totalStars = Array.from({ length: 5 * 2 }, (_, index) => index + 1);

  const { data: reviews, isLoading } = useQuery({
    queryKey: [
      "manufacturer_reviews",
      {
        id: manufacturerId,
      },
    ],
    queryFn: async () => {
      const { data } = await apiClient.api.manufacturers[
        manufacturerId
      ].reviews.get({
        $query: {},
      });
      return data;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col">
      {isLoading && <div>Загрузка...</div>}
      <div className="space-y-4">
        {reviews?.items.map((review: any) => (
          <article
            key={review.id}
            className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
          >
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  {review.user_data?.first_name} {review.user_data?.last_name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time dateTime="2022-06-23" title="June 23rd, 2022">
                    {dayjs(review.created_at).fromNow()}
                  </time>
                </p>
              </div>
            </footer>
            <div className="rating rating-lg rating-half">
              {totalStars.map((star, index) => (
                <div
                  className={clsx([
                    "bg-yellow-500 w-3 h-5 mask mask-star-2",
                    {
                      "opacity-20": index >= review.rating * 2,
                      "mask-half-1": index % 2 === 0,
                      "mask-half-2": index % 2 !== 0,
                    },
                  ])}
                />
              ))}
            </div>
            <p className="text-gray-500 dark:text-gray-400">{review.review}</p>
          </article>
        ))}
      </div>
    </div>
  );
};
