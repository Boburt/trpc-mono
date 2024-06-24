import { apiClient } from "@frontend_next/lib/eden";
import { Divider } from "@nextui-org/divider";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function CatalogMenu() {
  const { data, isLoading } = useQuery({
    queryKey: ["catalog_categories"],
    queryFn: async () => {
      const { data } = await apiClient.api.categories.public.tree.get();
      return data;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  return (
    <div className="w-full h-full bg-default-100 md:w-[800px]">
      {data && Array.isArray(data) && data.length > 0 && (
        <div className="grid grid-cols-2 gap-y-1">
          {data.map((category) => (
            <div key={category.id} className=" bg-white p-6">
              <div>
                <Link
                  href={`/catalog/${category.code}`}
                  className="font-bold text-gray-800 uppercase"
                >
                  {category.name}
                </Link>
                <Divider className="my-2" />
              </div>
              {category.children && category.children.length > 0 && (
                <div className="grid grid-cols-2 gap-x-4 ml-5">
                  {category.children.map((child) => (
                    <div key={child.id}>
                      <Link
                        href={`/catalog/${child.code}`}
                        className="font-medium text-sm text-default-900 dark:text-gray-700"
                      >
                        {child.name}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
