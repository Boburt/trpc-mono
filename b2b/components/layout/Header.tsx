export default function Header() {
  return (
    <div className="header-bg-image  bg-center bg-fixed bg-no-repeat bg-cover opacity-80 h-20">
      <div className="container mx-auto ">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">My App</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/manufacturer">Manufacturer</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex mx-auto justify-center">
          <input
            type="text"
            placeholder="Type here"
            className="input input-ghost w-full max-w-xs input-bordered"
          />
        </div>
      </div>
    </div>
  );
}
