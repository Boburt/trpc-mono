import Providers from "@frontend/src/store/provider";
import { apiClient } from "@frontend/src/utils/eden";
import { useQuery } from "@tanstack/react-query";
import { forms_sent_items } from "backend/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import { useCallback, useMemo, useState } from "react";
import { useCookieState } from "use-cookie-state";
import { Chip } from "@nextui-org/chip";
import { Spinner } from "@nextui-org/spinner";
import { Tooltip } from "@nextui-org/tooltip";
import { ClipboardList } from "lucide-react";
import {
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Table,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import dayjs from "dayjs";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

const statuses = {
  sent: {
    name: "Отправлено",
    color: "#FFB800",
  },
  filled: {
    name: "Заполнено",
    color: "#00B341",
  },
  opened: {
    name: "Открыто",
    // generate gray color
    color: "#808080".replace(/0/g, () => (~~(Math.random() * 16)).toString(16)),
  },
};

export const ProfileFormsSentItems = ({
  formId,
  initialData,
}: {
  formId: string;
  initialData:
    | {
        message: string;
        total?: undefined;
        data?: undefined;
      }
    | {
        data: InferSelectModel<typeof forms_sent_items>[];
        total: number;
        message?: string;
      };
}) => {
  const [accessToken, setAccessToken] = useCookieState("x-token", "");
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
    initialData,
    queryKey: [
      "forms_sent_items",
      {
        limit: pageSize,
        offset: (page - 1) * pageSize,
        fields: "id,created_at,status,model,model_id,opened_at,opened_by",
        filters: JSON.stringify([
          {
            field: "form_id",
            operator: "eq",
            value: formId,
          },
        ]),
      },
    ],
    queryFn: async () => {
      const { data } = await apiClient.api.forms_sent_items.get({
        $query: {
          limit: pageSize.toString(),
          offset: ((page - 1) * pageSize).toString(),
          fields: "id,created_at,status,model,model_id,opened_at,opened_by",
          filters: JSON.stringify([
            {
              field: "form_id",
              operator: "eq",
              value: formId,
            },
          ]),
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
    (
      ticket: InferSelectModel<typeof forms_sent_items>,
      columnKey: React.Key
    ) => {
      const cellValue =
        ticket[columnKey as keyof InferSelectModel<typeof forms_sent_items>];
      switch (columnKey) {
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

        case "created_at":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small">
                {dayjs(ticket.created_at).format("DD.MM.YYYY HH:mm:ss")}
              </p>
            </div>
          );

        case "opened_at":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small">
                {ticket.opened_at
                  ? dayjs(ticket.opened_at).format("DD.MM.YYYY HH:mm:ss")
                  : ""}
              </p>
            </div>
          );

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              {ticket.status == "filled" && (
                <FormFilledValuesModal formSendItemId={ticket.id} />
              )}
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
          Всего {data?.total ?? 0} рассылок
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
          <TableColumn key="created_at" allowsSorting>
            Дата отправки
          </TableColumn>
          <TableColumn key="model" allowsSorting>
            Получатель
          </TableColumn>
          <TableColumn key="opened_at" allowsSorting>
            Дата открытия формы
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
            <TableRow key={item.id}>
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

export const ProfileFormsSentItemsProvider = ({
  formId,
  initialData,
}: {
  formId: string;
  initialData:
    | {
        message: string;
        total?: undefined;
        data?: undefined;
      }
    | {
        data: InferSelectModel<typeof forms_sent_items>[];
        total: number;
        message?: string;
      };
}) => {
  return (
    <Providers>
      <ProfileFormsSentItems formId={formId} initialData={initialData} />
    </Providers>
  );
};

export const FormFilledValuesModal = ({
  formSendItemId,
}: {
  formSendItemId: string;
}) => {
  const [accessToken, setAccessToken] = useCookieState("x-token", "");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading } = useQuery({
    enabled: !!accessToken && isOpen,
    queryKey: [
      "forms_filled_values",
      {
        formId: formSendItemId,
      },
    ],
    queryFn: async () => {
      const { data } = await apiClient.api.forms_sent_items[
        formSendItemId
      ].filled_values.get({
        $headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    },
  });

  return (
    <>
      <Tooltip content="Посмотреть ответы">
        <span
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
          onClick={() => onOpen()}
        >
          <ClipboardList className="w-5 h-5" />
        </span>
      </Tooltip>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Ответы на форму
              </ModalHeader>
              <ModalBody>
                <div className="grid space-y-3">
                  {isLoading ? (
                    <Spinner label="Загрузка..." />
                  ) : (
                    <>
                      {data &&
                        Array.isArray(data) &&
                        data?.map((item) => (
                          <dl
                            className="grid sm:flex gap-x-3 text-sm"
                            key={item.id}
                          >
                            <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                              {item.field_label}:
                            </dt>
                            <dd className="text-gray-800 dark:text-gray-200">
                              {item.value}
                            </dd>
                          </dl>
                        ))}
                    </>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  type="button"
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  onClick={onClose}
                >
                  Закрыть
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
