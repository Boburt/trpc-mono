import { $accessToken } from "@frontend/src/store/auth";
import { apiClient } from "@frontend/src/utils/eden";
import { useStore } from "@nanostores/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@nextui-org/spinner";
import { useCallback, useMemo, useState } from "react";
import { Pagination } from "@nextui-org/pagination";
import { SpTicketsRelatedList } from "@backend/modules/sp_tickets/sp_tickets.dto";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { Eye } from "lucide-react";

export const RequestsListTable = () => {
  const accessToken = useStore($accessToken);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPageSize(Number(e.target.value));
      setPage(1);
    },
    []
  );
  const { data, isLoading } = useQuery({
    enabled: !!accessToken,
    queryKey: [
      "sp_tickets",
      {
        limit: pageSize,
        offset: (page - 1) * pageSize,
        fields:
          "id,name,sp_ticket_categories.name,sp_ticket_statuses.name,sp_ticket_statuses.color",
      },
    ],
    queryFn: async () => {
      const { data } = await apiClient.api.sp_tickets.get({
        $query: {
          limit: pageSize.toString(),
          offset: ((page - 1) * pageSize).toString(),
          fields:
            "id,name,sp_ticket_categories.name,sp_ticket_statuses.name,sp_ticket_statuses.color",
        },
        $headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    },
  });

  const pages = useMemo(() => {
    if (data?.total === undefined) {
      return 0;
    }
    return Math.ceil(data?.total / pageSize);
  }, [data?.total, pageSize]);

  const renderCell = useCallback(
    (ticket: SpTicketsRelatedList, columnKey: React.Key) => {
      const cellValue = ticket[columnKey as keyof SpTicketsRelatedList];
      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{ticket.name}</p>
            </div>
          );
        case "sp_ticket_statuses":
          return (
            <Chip
              classNames={{
                base: "border-small border-white/50 px-2",
                content: "drop-shadow shadow-black text-white",
              }}
              style={{
                backgroundColor: ticket.sp_ticket_statuses.color!,
              }}
              size="sm"
              variant="shadow"
            >
              {ticket.sp_ticket_statuses.name}
            </Chip>
          );
        case "sp_ticket_categories":
          return (
            <div className="relative flex items-center gap-2">
              {ticket.sp_ticket_categories.name}
            </div>
          );

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <a href={`/profile/requests/${ticket.id}`}>
                <Tooltip content="Подробнее">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <Eye />
                  </span>
                </Tooltip>
              </a>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Всего {data?.total ?? 0} обращений
        </span>
        <label className="flex items-center text-default-400 text-small">
          Показывать по:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}
            value={pageSize}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </label>
      </div>
      <Table
        isHeaderSticky
        classNames={{
          table: "min-h-[400px]",
        }}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="sp_ticket_statuses" allowsSorting>
            Статус
          </TableColumn>
          <TableColumn key="name" allowsSorting>
            Тема
          </TableColumn>
          <TableColumn key="sp_ticket_categories" allowsSorting>
            Категория
          </TableColumn>
          <TableColumn key="actions" allowsSorting>
            {" "}
          </TableColumn>
        </TableHeader>
        <TableBody
          items={data?.data ?? []}
          isLoading={isLoading}
          loadingContent={<Spinner label="Загрузка..." />}
          emptyContent={"Нет данных"}
        >
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
