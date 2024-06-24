"use client";
import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
  SortDescriptor,
} from "@nextui-org/table";
import { Input } from "@nextui-org/input";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Pagination } from "@nextui-org/pagination";
import { ProductDrawer } from "./drawer";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@frontend_next/lib/eden";
import { products } from "backend/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import { SearchIcon } from "lucide-react";
import { useSession } from "next-auth/react";

//@ts-ignore
const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "danger",
};

const columns = [
  { name: "PRODUCT NAME", uid: "name", sortable: true },
  { name: "DESCRIPTION", uid: "description", sortable: true },
  { name: "PRICE", uid: "price", sortable: true },
  { name: "QUANTITY", uid: "stock_quantity" },
  { name: "ACTIVE", uid: "active", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "product name",
  "description",
  "price",
  "quantity",
  "active",
  "actions",
];

export default function ProductsList() {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const { data: session } = useSession();

  const accessToken = session?.accessToken;

  const { data: productsList, isLoading } = useQuery({
    queryKey: [
      "products",
      {
        limit: rowsPerPage,
        offset: (page - 1) * rowsPerPage,
        filter: filterValue,
      },
    ],
    queryFn: async () => {
      const { data } = await apiClient.api.products.get({
        query: {
          limit: rowsPerPage,
          offset: (page - 1) * rowsPerPage,
          fields: "id,name,description,active,price,properties,stock_quantity",
          filters: JSON.stringify([
            {
              operator: "contains",
              field: "name",
              value: filterValue,
            },
          ]),
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const hasSearchFilter = Boolean(filterValue);

  const pages = useMemo(() => {
    if (productsList?.total === undefined) {
      return 0;
    }
    return Math.ceil(productsList?.total / rowsPerPage);
  }, [productsList?.total, rowsPerPage]);

  const totalCount = useMemo(() => {
    if (productsList?.total === undefined) {
      return 0;
    }
    return productsList?.total;
  }, [productsList?.total]);

  const items = React.useMemo(() => {
    // @ts-ignore
    let res: InferSelectModel<typeof products>[] = [];
    if (
      productsList?.data &&
      Array.isArray(productsList.data) &&
      productsList.data.length > 0
    ) {
      res = productsList.data;
    }
    return res;
  }, [productsList]);

  const renderCell = React.useCallback(
    (
      product: InferSelectModel<typeof products>,
      columnKey: React.Key
    ): React.ReactNode => {
      // @ts-ignore
      const cellValue =
        product[columnKey as keyof InferSelectModel<typeof products>];

      switch (columnKey) {
        case "product name":
          return (
            <div className="flex flex-col">
              <span className="text-bold text-small capitalize">
                {cellValue?.toString()}
              </span>
            </div>
          );
        case "description":
          return (
            <div className="flex flex-col">
              <span className="text-bold text-small capitalize">
                {cellValue?.toString()}
              </span>
            </div>
          );
        case "price":
          return (
            <div className="flex flex-col">
              <span className="text-bold text-small capitalize">
                {cellValue?.toString()}
              </span>
            </div>
          );
        case "quantity":
          return (
            <div className="flex flex-col">
              <span className="text-bold text-small capitalize">
                {cellValue?.toString()}
              </span>
            </div>
          );
        case "active":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[product.active.toString()]}
              size="sm"
              variant="flat"
            >
              {cellValue ? "Активен" : "Не активен"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <ProductDrawer record_id={product.id} />
            </div>
          );
        default:
          return <>{cellValue}</>;
      }
    },
    []
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Поиск по имени..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <ProductDrawer />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Всего {totalCount} продукта(ов)
          </span>
          <label className="flex items-center text-default-400 text-small">
            Строк на странице:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5" selected={rowsPerPage == 5}>
                5
              </option>
              <option value="10" selected={rowsPerPage == 10}>
                10
              </option>
              <option value="15" selected={rowsPerPage == 15}>
                15
              </option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    hasSearchFilter,
    totalCount,
    open,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[670px]",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No product found"} items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
