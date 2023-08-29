export default function Header() {
  return (
    <div className="header-bg-image bg-center bg-no-repeat bg-cover opacity-80 pb-40 pt-5">
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
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
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
      <a
        href="/manufacturer"
        className="flex mx-auto justify-center text-white"
      >
        <h1 className="text-xl font-extrabold text-indigo-600 hover:text-black hover:underline active:underline">
          Manufacturer
        </h1>
      </a>
    </div>
  );
}
