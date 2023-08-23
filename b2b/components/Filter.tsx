"use client";
import { ChangeEvent, useEffect, useState } from "react";
import useSWR from "swr";

interface DataItem {
  id: number;
  [key: string]: any;
}

export default function Filter() {
  const [dataType, setDataType] = useState<"posts" | "users" | "todos">(
    "posts"
  );
  const { data, error } = useSWR<DataItem[]>(
    `https://jsonplaceholder.typicode.com/${dataType}`,
    fetcher
  );

  const handleSelectionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedType = e.target.value as "posts" | "users" | "todos";
    setDataType(selectedType);
  };

  return (
    <>
      <div className="sticky top-0 bg-white mx-auto rounded-md items-center p-4 mb-2">
        <div className="flex gap-4">
          <label
            className={
              dataType === "posts"
                ? "border-b-2 border-black"
                : "cursor-pointer"
            }
          >
            <input
              type="radio"
              name="dataType"
              value="posts"
              checked={dataType === "posts"}
              onChange={handleSelectionChange}
              hidden
            />
            Posts
          </label>
          <label
            className={
              dataType === "users"
                ? "border-b-2 border-black"
                : "cursor-pointer"
            }
          >
            <input
              type="radio"
              name="dataType"
              value="users"
              checked={dataType === "users"}
              onChange={handleSelectionChange}
              hidden
            />
            Users
          </label>
          <label
            className={
              dataType === "todos"
                ? "border-b-2 border-black"
                : "cursor-pointer"
            }
          >
            <input
              type="radio"
              name="dataType"
              value="todos"
              checked={dataType === "todos"}
              onChange={handleSelectionChange}
              hidden
            />
            Todos
          </label>
        </div>
        <div className="divider my-2"></div>
        <div className="flex items-center gap-2">
          <div className="rounded-md border px-2">Verified</div>
          <div className="rounded-md border px-2">Verified</div>
          <div className="rounded-md border px-2">Verified</div>
          <div className="rounded-md border px-2">Verified</div>
        </div>
      </div>
      <div>
        {!data && <p>Loading...</p>}
        <div>
          {data?.map((item: any) => (
            <div key={item.id}>{JSON.stringify(item, null, 2)}</div>
          ))}
        </div>
      </div>
    </>
  );
}

async function fetcher(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Data fetch failed");
  }
  return response.json();
}
