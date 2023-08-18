"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/");
  };
  return (
    <div className="header-bg-image bg-center  bg-no-repeat bg-cover opacity-80 pb-40 pt-5">
      <div className="bg-white py-2">
        <div className="container mx-auto flex items-center justify-between">
          <div onClick={handleClick} className="cursor-pointer">
            <h1 className="text-2xl font-bold">My App</h1>
          </div>
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
    </div>
  );
}
