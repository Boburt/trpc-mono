import clsx from "clsx";

export default function Header({
  showHeaderFilter,
}: {
  showHeaderFilter: boolean;
}) {
  return (
    <div
      className={clsx([
        "header-bg-image bg-center bg-no-repeat bg-cover opacity-80 pt-5",
        {
          "pb-40": showHeaderFilter,
          "pb-10": !showHeaderFilter,
        },
      ])}
    >
      <div className="bg-white py-2">
        <div className="container mx-auto flex items-center justify-between">
          <div className="cursor-pointer">
            <a href="/">
              <h1 className="text-2xl font-bold">My App</h1>
            </a>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" class="focus:border-b-4">Home</a>
              </li>
              <li>
                <a href="/about" class="focus:border-b-4">About</a>
              </li>
              <li>
                <a href="/news" class="focus:border-b-4">News</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {showHeaderFilter && (
        <>
          <div className="flex justify-center mt-5">
            <div className="join">
              <div>
                <div>
                  <input
                    className="input input-bordered join-item"
                    placeholder="Search"
                  />
                </div>
              </div>
              <button className="btn join-item">Search</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
