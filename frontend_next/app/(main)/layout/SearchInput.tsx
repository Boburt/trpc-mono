import { Input } from "@nextui-org/input";
import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const HeaderSearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    // Set initial search term from URL
    const query = searchParams.get("query");
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    updateSearchParams("");
  };

  const updateSearchParams = (query: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (query) {
      current.set("query", query);
    } else {
      current.delete("query");
    }

    const search = current.toString();
    const queryString = search ? `?${search}` : "";

    router.push(`/catalog/${queryString}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-1">
      <Input
        isClearable
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        startContent={<Search />}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClear={handleClear}
        radius="full"
      />
    </form>
  );
};
