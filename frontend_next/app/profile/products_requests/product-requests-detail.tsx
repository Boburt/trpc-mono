import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@frontend_next/lib/eden";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { ru } from "date-fns/locale/ru";
import { format } from "date-fns";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@frontend_next/components/ui/alert";
import { TriangleAlertIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProductRequestDetails({
  requestId,
}: {
  requestId: string;
}) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const { data, isLoading, error } = useQuery({
    queryKey: ["productRequestDetails", requestId, accessToken],
    queryFn: async () => {
      const { data } = await apiClient.api
        .product_requests({
          id: requestId,
        })
        .get({
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (data && "id" in data) {
    return (
      <div>
        <div className="mb-4">
          <p>
            <strong>Дата создания:</strong>{" "}
            {format(new Date(data.created_at), "dd.MM.yyyy HH:mm", {
              locale: ru,
            })}
          </p>
          <p>
            <strong>Клиент:</strong> {`${data.firstName} ${data.lastName}`}
          </p>
          <p>
            <strong>Статус:</strong> {data.status}
          </p>
        </div>

        <h3 className="text-lg font-semibold mb-2">Заказанные продукты</h3>
        <Table aria-label="Таблица заказанных продуктов">
          <TableHeader>
            <TableColumn>Название продукта</TableColumn>
            <TableColumn>Кол-во</TableColumn>
          </TableHeader>
          <TableBody>
            {data.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
