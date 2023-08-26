"use client";
import useSWR from "swr";

interface DataItem {
  id: number;
  [key: string]: any;
}

type Props = {
  params: {
    cat: string;
  };
};

export default function Categories({ params }: Props) {
  const { data, error } = useSWR<DataItem[]>(
    `https://jsonplaceholder.typicode.com/${params.cat}`,
    fetcher
  );

  console.log(data);

  return (
    <>
      <div>
        {data ? (
          <div className="flex flex-wrap justify-center">
            {JSON.stringify(data, null, 2)}
          </div>
        ) : (
          <div>loading...</div>
        )}
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
