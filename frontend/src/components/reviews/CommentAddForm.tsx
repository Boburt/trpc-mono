import { $accessToken } from "@frontend/src/store/auth";
import { apiClient } from "@frontend/src/utils/eden";
import { useStore } from "@nanostores/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
type reviewFormData = {
  review: string;
  rating: number;
};

export const ManufacturerCommentAddForm = ({
  manufacturerId,
}: {
  manufacturerId: string;
}) => {
  const accessToken = useStore($accessToken);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<reviewFormData>({ defaultValues: { rating: 0 } });

  const reviewCreateMutation = useMutation({
    mutationFn: (newTodo: {
      manufacturer_id: string;
      rating: number;
      review: string;
    }) => {
      return apiClient.api.manufacturers.review.post({
        ...newTodo,
        $headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    onSuccess: () => {
      reset();
      toast.success("Комментарий успешно добавлен и ожидает модерации");
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      reviewCreateMutation.mutate({
        manufacturer_id: manufacturerId,
        review: data.review,
        rating: +data.rating,
      });
    } catch (error) {}
    // setErrorMessage(null);
    // const res = await login(data.login, data.password);
    // if (res?.error) {
    //   setErrorMessage(res.error);
    // } else {
    //   window.auth_modal.close();
    // }
  });
  return (
    <form className="mb-6" onSubmit={onSubmit}>
      <div className="rating mb-3">
        <input
          type="radio"
          {...register("rating")}
          className="mask mask-star-2 bg-orange-400"
          defaultChecked={true}
          value={1}
        />
        <input
          type="radio"
          {...register("rating")}
          className="mask mask-star-2 bg-orange-400"
          value={2}
        />
        <input
          type="radio"
          {...register("rating")}
          className="mask mask-star-2 bg-orange-400"
          value={3}
        />
        <input
          type="radio"
          {...register("rating")}
          className="mask mask-star-2 bg-orange-400"
          value={4}
        />
        <input
          type="radio"
          {...register("rating")}
          className="mask mask-star-2 bg-orange-400"
          value={5}
        />
      </div>
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label htmlFor="comment" className="sr-only">
          Ваш комментарий
        </label>
        <textarea
          id="comment"
          rows={6}
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          placeholder="Напишите ваш комментарий..."
          {...register("review", { required: true })}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary btn-sm">
        {reviewCreateMutation.isPending && (
          <span className="loading loading-spinner"></span>
        )}
        Добавить комментарий
      </button>
    </form>
  );
};
