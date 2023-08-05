import { trpc } from "../utils/trpc";

export default async function Home() {
  const data = await trpc.permissions.findMany;

  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
