import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@frontend/src/utils/eden";
import { useStore } from "@nanostores/react";
import { $accessToken } from "@frontend/src/store/auth";
import { sp_tickets_comments } from "backend/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export const ChatCard = ({
  comments,
}: {
  comments: InferSelectModel<typeof sp_tickets_comments>[];
}) => {
  return (
    <>
      {comments.map((comment) => (
        <div className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
          <img
            className="inline-block h-9 w-9 rounded-full"
            src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
            alt="Image Description"
          />

          <div>
            {/* <!-- Card --> */}
            <div className="bg-white border text-left border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
              <div className="flex space-x-3 items-baseline">
                <h2 className="font-medium text-gray-800 dark:text-gray-400 ">
                  {comment.user.name}" "{comment.user.last_name}"
                </h2>
                <span className="text-xs text-gray-700 dark:text-gray-500 text-">
                  {comment.created_at}
                </span>
              </div>

              <div className="space-y-1.5">
                <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                  {comment.comment}
                </p>
              </div>
            </div>
            {/* <!-- End Card --> */}
          </div>
        </div>
      ))}
    </>
  );
};
