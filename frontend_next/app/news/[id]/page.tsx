export default function NewsDetailPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  console.log(id);
  return <div>NewsDetailPage</div>;
}
