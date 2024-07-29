export default function ProductsRequest({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1>Products Request {id}</h1>
    </div>
  );
}
