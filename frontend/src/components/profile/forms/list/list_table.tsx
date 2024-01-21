import { SpTicketsRelatedList } from "@backend/modules/sp_tickets/sp_tickets.dto";
import { $accessToken } from "@frontend/src/store/auth";
import { apiClient } from "@frontend/src/utils/eden";
import { useStore } from "@nanostores/react";
import { Chip } from "@nextui-org/chip";
import { Spinner } from "@nextui-org/spinner";
import {
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Table,
} from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import { Eye, Edit2 } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { Pagination } from "@nextui-org/pagination";
import { Tooltip } from "@nextui-org/tooltip";
import { forms } from "backend/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import dayjs from "dayjs";

const statuses = {
  new: {
    name: "Новое",
    color: "#FFB800",
  },
};

const scheduleTypes = {
  later: "Позже вручную",
  now: "Сейчас",
  scheduled: "Запланировать",
};

export const ProfileFormsListTable = () => {
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
      "forms",
      {
        limit: pageSize,
        offset: (page - 1) * pageSize,
        fields: "id,name,status,created_at,schedule_type,schedule_time",
      },
    ],
    queryFn: async () => {
      const { data } = await apiClient.api.forms.get({
        $query: {
          limit: pageSize.toString(),
          offset: ((page - 1) * pageSize).toString(),
          fields: "id,name,status,created_at,schedule_type,schedule_time",
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
    (ticket: InferSelectModel<typeof forms>, columnKey: React.Key) => {
      const cellValue =
        ticket[columnKey as keyof InferSelectModel<typeof forms>];
      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{ticket.name}</p>
            </div>
          );
        case "status":
          return (
            <Chip
              classNames={{
                base: "border-small border-white/50 px-2",
                content: "drop-shadow shadow-black text-white",
              }}
              style={{
                backgroundColor:
                  statuses[ticket.status as keyof typeof statuses].color,
              }}
              size="sm"
              variant="shadow"
            >
              {statuses[ticket.status as keyof typeof statuses].name}
            </Chip>
          );

        case "schedule_type":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small uppercase">
                {
                  scheduleTypes[
                    ticket.schedule_type as keyof typeof scheduleTypes
                  ]
                }
              </p>
            </div>
          );

        case "schedule_time":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small uppercase">
                {ticket.schedule_time
                  ? dayjs(ticket.schedule_time).format("DD.MM.YYYY HH:mm")
                  : ""}
              </p>
            </div>
          );

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <a href={`/profile/forms/show/${ticket.id}`}>
                <Tooltip content="Подробнее">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <Eye className="w-5 h-5" />
                  </span>
                </Tooltip>
              </a>
              <a href={`/profile/forms/edit/${ticket.id}`}>
                <Tooltip content="Редактировать">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <Edit2 className="w-5 h-5" />
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
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              initialPage={page}
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="status" allowsSorting>
            Статус
          </TableColumn>
          <TableColumn key="name" allowsSorting>
            Название формы
          </TableColumn>
          <TableColumn key="schedule_type" allowsSorting>
            Время отправки
          </TableColumn>
          <TableColumn key="schedule_time" allowsSorting>
            Запланированное время
          </TableColumn>
          <TableColumn key="actions" allowsSorting>
            Действия
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
