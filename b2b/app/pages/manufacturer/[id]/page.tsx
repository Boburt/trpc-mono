import ManData from "../data";

export async function getData(id: string) {
  const response = await fetch(ManData);

  return response.json();
}

type Props = {
  params: {
    id: string;
  };
};

export default async function Manufac({ params: { id } }: Props) {
  const post = await getData(id);

  return (
    <>
      <h1>{post.name}</h1>
      <p>{post.derc}</p>
    </>
  );
}
