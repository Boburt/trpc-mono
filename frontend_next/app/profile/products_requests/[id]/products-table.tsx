"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
export default function ProductRequestDetailTable({
  products,
}: {
  products: {
    id: string;
    name: string;
    quantity: number;
  }[];
}) {
  return (
    <Table aria-label="Таблица заказанных продуктов">
      <TableHeader>
        <TableColumn>Название продукта</TableColumn>
        <TableColumn>Кол-во</TableColumn>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
