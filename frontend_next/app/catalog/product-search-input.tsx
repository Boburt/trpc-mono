import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Search, X } from "lucide-react";

export default function ProductSearchInput() {
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

    router.push(`${pathname}${queryString}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <div className="relative">
        <Input
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-8"
        />
        {searchTerm && (
          <Button
            type="button"
            isIconOnly
            aria-label="Clear search"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            size="sm"
            variant="light"
            onPress={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Button type="submit" isIconOnly aria-label="Search" className="ml-2">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
