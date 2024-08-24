"use client";
import { apiClient } from "@frontend_next/lib/eden";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { searchParams } from "./searchParams";
import { Pagination } from "@nextui-org/pagination";
import { Button, Card, CardBody, Chip, Link } from "@nextui-org/react";
import { CheckCircle, Star } from "lucide-react";
import NextImage from "next/image";
import { Image } from "@nextui-org/image";

export default function ManufacturersList() {
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    searchParams.page
  );
  const [page_size, setPage_size] = useQueryState(
    "page_size",
    searchParams.page_size
  );
  const [city, setCity] = useQueryState("city", searchParams.city);
  const [capacity, setCapacity] = useQueryState(
    "capacity",
    searchParams.capacity
  );
  const [query, setQuery] = useQueryState("query", searchParams.query);
  const [sort, setSort] = useQueryState("sort", searchParams.sort);
  const { data } = useSuspenseQuery({
    queryKey: [
      "manufacturers",
      currentPage,
      page_size,
      city?.join("|"),
      capacity?.join("|"),
      query,
      sort,
    ],
    queryFn: async () => {
      console.log("api call city", city);
      const { data } = await apiClient.api.manufacturers.list.post({
        limit: page_size,
        page: currentPage,
        fields: "id,name,city,capacity,description,images",
        city,
        capacity,
        query,
      });
      return data;
    },
  });
  if (
    data &&
    Array.isArray(data.manufacturers) &&
    data.manufacturers.length > 0
  ) {
    return (
      <div>
        <div className="space-y-4">
          {data?.manufacturers.map((manufacturer) => (
            <Card key={manufacturer.id} className="w-full">
              <CardBody className="flex flex-row p-4">
                {manufacturer.images && manufacturer.images.length > 0 && (
                  <div className="w-1/4 pr-4">
                    <Link
                      href={`/manufacturers/${manufacturer.id}`}
                      className="p-4"
                    >
                      <Image
                        as={NextImage}
                        isZoomed
                        radius="lg"
                        width={200}
                        height={200}
                        className="w-full object-cover h-48"
                        src={`${process.env.NEXT_PUBLIC_API_URL}${manufacturer.images?.[0]?.path}`}
                        alt={manufacturer.name}
                      />
                    </Link>
                  </div>
                )}
                <div className="w-3/4 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      {manufacturer.name}
                    </span>
                    {manufacturer.rating && (
                      <div className="flex items-center">
                        <Star className="text-yellow-400 mr-1" size={16} />
                        <span className="text-sm">
                          {manufacturer.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          (1,000+ reviews)
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {manufacturer.city} | {manufacturer.staff_count}+
                    Сотрудников
                  </p>
                  <div className="mt-2 flex items-center">
                    {manufacturer.verified && (
                      <Chip color="success" variant="flat" className="mr-2">
                        <CheckCircle size={14} className="mr-1" /> Verified
                      </Chip>
                    )}
                    {manufacturer.certificates.map((cert, index) => (
                      <Chip
                        key={index}
                        className="mr-2"
                        size="sm"
                        variant="flat"
                      >
                        {cert}
                      </Chip>
                    ))}
                  </div>
                  <p className="text-sm mt-2 flex-grow">
                    {manufacturer.description}
                  </p>
                  <div className="mt-2 flex justify-between items-end">
                    <div>
                      <p className="text-sm font-semibold">Main Products:</p>
                      <div className="flex flex-wrap mt-1">
                        {manufacturer.capacity.slice(0, 3).map((cap, index) => (
                          <Chip
                            key={index}
                            className="mr-1 mb-1"
                            size="sm"
                            variant="flat"
                          >
                            {cap}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    <Button color="primary">Contact Supplier</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="flex justify-around items-center mt-6 w-full">
          <Pagination
            total={data.totalPages}
            color="primary"
            page={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    );
  } else {
    return <div>Нет данных</div>;
  }
}
