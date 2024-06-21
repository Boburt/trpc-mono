export default function Catalog() {
  const catalog = [
    {
      name: "Продукция 1",
    },
    {
      name: "Продукция 2",
    },
    {
      name: "Продукция 3",
    },
    {
      name: "Продукция 4",
    },
  ];
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="sm:w-1/2 xl:w-1/3 mx-auto text-center mb-6 md:mb-12">
        <h2 className="text-xl font-semibold md:text-2xl md:leading-tight text-gray-800 dark:text-gray-200">
          Каталог продукции партнеров
        </h2>
      </div>
      <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
        {catalog &&
          catalog?.length > 0 &&
          catalog.map((catal) => (
            <a href="/manufacturers" key={catal.name}>
              <div className="p-4 md:p-7 bg-gray-100 rounded-lg h-24 dark:bg-slate-800 flex space-x-2 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-badge-check dark:text-green-50"
                >
                  <>
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path d="m9 12 2 2 4-4" />
                  </>
                </svg>
                <h3 className="dark:text-green-50">{catal.name}</h3>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
}
