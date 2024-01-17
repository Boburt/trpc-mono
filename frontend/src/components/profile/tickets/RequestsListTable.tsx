import { $accessToken } from "@frontend/src/store/auth";
import Providers from "@frontend/src/store/provider";
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
        fields: "id,short_name,name,active",
      },
    ],
    queryFn: async () => {
      const { data } = await apiClient.api.sp_tickets.get({
        $query: {
          limit: pageSize.toString(),
          offset: ((page - 1) * pageSize).toString(),
          fields: "id,short_name,name,active",
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
          <TableColumn key="name" allowsSorting>
            Name
          </TableColumn>
          <TableColumn key="height" allowsSorting>
            Height
          </TableColumn>
          <TableColumn key="mass" allowsSorting>
            Mass
          </TableColumn>
          <TableColumn key="birth_year" allowsSorting>
            Birth year
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
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
