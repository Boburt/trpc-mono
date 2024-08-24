import { auth } from "@frontend_next/auth";
import { apiClient } from "@frontend_next/lib/eden";
import { withPermissionCheck } from "@frontend_next/lib/withPermissionCheck";
import { GetServerSideProps } from "next";
import { redirect } from "next/navigation";
import { ru } from "date-fns/locale/ru";
import { format } from "date-fns";
import ProductRequestDetailTable from "./products-table";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@frontend_next/components/ui/alert";
import { TriangleAlertIcon } from "lucide-react";

export default async function ProductsRequest({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const { data } = await apiClient.api.users.my_permissions.get({
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (
    !data ||
    !Array.isArray(data) ||
    !data.includes("products_requests.edit")
  ) {
    redirect("/has-no-permission");
  }

  const { data: requestData } = await apiClient.api
    .product_requests({
      id,
    })
    .get({
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

  if (requestData && "id" in requestData) {
    return (
      <div>
        <div className="mb-4">
          <p>
            <strong>Номер заявки:</strong> {requestData.requestNumber}
          </p>
          <p>
            <strong>Дата создания:</strong>{" "}
            {format(new Date(requestData.created_at), "dd.MM.yyyy HH:mm", {
              locale: ru,
            })}
          </p>
          <p>
            <strong>Клиент:</strong>{" "}
            {`${requestData.firstName} ${requestData.lastName}`}
          </p>
          <p>
            <strong>Статус:</strong> {requestData.status}
          </p>
        </div>

        <h3 className="text-lg font-semibold mb-2">Заказанные продукты</h3>
        <ProductRequestDetailTable products={requestData.products} />
      </div>
    );
  } else {
    return (
      <Alert variant="destructive" className="text-red-400 bg-white">
        <TriangleAlertIcon className="h-4 w-4" />
        <AlertTitle>Ошибка</AlertTitle>
        <AlertDescription>Заявка не найден</AlertDescription>
      </Alert>
    );
  }
}
