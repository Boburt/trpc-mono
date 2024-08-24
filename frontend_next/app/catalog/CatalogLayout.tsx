export default function CatalogLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="">
      {title}
      {children}
    </div>
  );
}
