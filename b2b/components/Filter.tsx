"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "Posts", slug: "posts" },
  { name: "Users", slug: "users" },
  { name: "Todos", slug: "todos" },
];

export default function Filter() {
  const pathname = usePathname();

  return (
    <>
      <div className="sticky top-0 bg-white mx-auto rounded-md items-center p-4 mb-2">
        <div className="flex gap-4">
          {categories.map((category) => {
            const isActive = pathname === `/categories/${category.slug}`;
            return (
              <Link
                href={`/categories/${category.slug}`}
                className={
                  isActive ? "border-b-2 border-black" : "cursor-pointer"
                }
                key={category.slug}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
        <div className="divider my-2"></div>
        <div className="flex items-center gap-2">
          <div className="rounded-md border px-2">Verified</div>
          <div className="rounded-md border px-2">Verified</div>
          <div className="rounded-md border px-2">Verified</div>
          <div className="rounded-md border px-2">Verified</div>
        </div>
      </div>
    </>
  );
}
