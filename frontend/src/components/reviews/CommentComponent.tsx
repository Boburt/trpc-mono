import { $isLoggedIn } from "@frontend/src/store/auth";
import { useStore } from "@nanostores/react";
import React, { useState } from "react";
import { ManufacturerCommentAddForm } from "./CommentAddForm";
import { ManufacturersReviewsList } from "./CommentsList";
declare global {
  interface Window {
    auth_modal: {
      showModal: () => void;
      close: () => void;
    };
  }
}
const CommentComponent = ({
  manufacturerId,
  reviewsCount,
}: {
  manufacturerId: string;
  reviewsCount: number;
}) => {
  const isLoggedIn = useStore($isLoggedIn);
  return (
    <section className="py-8 lg:py-16 antialiased space-y-4">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Комментарии ({reviewsCount ?? 0})
          </h2>
        </div>
        {isLoggedIn ? (
          <ManufacturerCommentAddForm manufacturerId={manufacturerId} />
        ) : (
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="text-sm text-gray-900 dark:text-white">
              Чтобы оставить комментарий, пожалуйста,{" "}
              <a
                href="javascript:void(0)"
                onClick={() => window.auth_modal.showModal()}
                className="text-primary-700 hover:underline dark:text-primary-400"
              >
                войдите
              </a>{" "}
              или{" "}
              <a
                href="#"
                className="text-primary-700 hover:underline dark:text-primary-400"
              >
                зарегистрируйтесь
              </a>
            </p>
          </div>
        )}

        <ManufacturersReviewsList manufacturerId={manufacturerId} />
      </div>
    </section>
  );
};

export default CommentComponent;
