"use client";
import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { ChipProps } from "@nextui-org/chip";
import { Pagination } from "@nextui-org/pagination";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@frontend_next/lib/eden";
import { Eye } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Select, SelectItem } from "@nextui-org/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@frontend_next/components/ui/sheet";
import ProductRequestDetails from "./product-requests-detail";
import { productRequests } from "backend/drizzle/schema";
import { startOfWeek, endOfWeek, today } from "@internationalized/date";
import { ru } from "date-fns/locale/ru";
import { format } from "date-fns";

const statusColorMap: Record<string, ChipProps["color"]> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

const columns = [
  { name: "ДЕЙСТВИЯ", uid: "actions" },
  { name: "СТАТУС", uid: "status" },
  { name: "ДАТА СОЗДАНИЯ", uid: "created_at" },
  { name: "КЛИЕНТ", uid: "requester" },
];

export default function ProductRequestsTable() {
  const [page, setPage] = React.useState(1);
  const { push } = useRouter();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRequest, setSelectedRequest] = React.useState<
    typeof productRequests.$inferSelect | null
  >(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const status = searchParams.get("status") || "all";
  const dateFrom = searchParams.get("dateFrom") || "";
  const dateTo = searchParams.get("dateTo") || "";
  const searchTerm = searchParams.get("search") || "";

  const { data: requestsData, isLoading } = useQuery({
    queryKey: [
      "product_requests",
      page,
      rowsPerPage,
      status,
      dateFrom,
      dateTo,
      searchTerm,
      accessToken,
    ],
    queryFn: async () => {
      const { data } = await apiClient.api.product_requests.get({
        query: {
          page,
          limit: rowsPerPage,
          status,
          dateFrom:
            dateFrom && dateFrom.length > 0
              ? dateFrom
              : startOfWeek(today("Asia/Tashkent"), "ru-RU").toString(),
          dateTo:
            dateTo && dateTo.length > 0
              ? dateTo
              : endOfWeek(today("Asia/Tashkent"), "ru-RU").toString(),
          search: searchTerm,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "pending" | "approved" | "rejected";
    }) => {
      await apiClient.api
        .product_requests({
          id,
        })
        .put(
          {
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product_requests"],
      });
    },
  });

  const pages = useMemo(() => {
    return requestsData?.totalPages || 0;
  }, [requestsData?.totalPages]);

  const items = useMemo(() => {
    return requestsData?.requests || [];
  }, [requestsData?.requests]);

  const renderCell = React.useCallback(
    (request: typeof productRequests.$inferSelect, columnKey: React.Key) => {
      switch (columnKey) {
        case "actions":
          return (
            <Button
              isIconOnly
              onClick={() => push(`/profile/products_requests/${request.id}`)}
              size="sm"
            >
              <Eye />
            </Button>
          );
        case "status":
          return (
            <Select
              selectedKeys={[request.status]}
              onChange={(e) =>
                handleStatusChange(
                  request.id,
                  e.target.value as "pending" | "approved" | "rejected"
                )
              }
              size="sm"
            >
              <SelectItem key="pending" value="pending">
                В ожидании
              </SelectItem>
              <SelectItem key="approved" value="approved">
                Обработано
              </SelectItem>
              <SelectItem key="rejected" value="rejected">
                Отклонено
              </SelectItem>
            </Select>
          );
        case "created_at":
          return format(new Date(request.created_at), "dd.MM.yyyy HH:mm", {
            locale: ru,
          });
          return;
        case "requester":
          return `${request.firstName} ${request.lastName}`;
        default:
          return (
            <>
              {request[columnKey as keyof typeof productRequests.$inferSelect]}
            </>
          );
      }
    },
    []
  );

  const handleViewRequest = (request: typeof productRequests.$inferSelect) => {
    setSelectedRequest(request);
    setIsOpen(true);
  };

  const handleStatusChange = (
    id: string,
    newStatus: "pending" | "approved" | "rejected"
  ) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Всего заявок: {requestsData?.total}
          </span>
          <label className="flex items-center text-default-400 text-small">
            Показывать по на странице:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [requestsData?.total, onRowsPerPageChange]);

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
    <>
      <Table
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[670px]",
        }}
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Запросы не найдены"} items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="bg-content4 w-1/3 sm:max-w-6xl">
          <SheetHeader>
            <SheetTitle>Запрос на продукт</SheetTitle>
          </SheetHeader>
          {selectedRequest && (
            <ProductRequestDetails requestId={selectedRequest.id} />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
