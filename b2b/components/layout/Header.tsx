"use client";
import Link from "next/link";

export default function Header() {
  return (
    <div className="header-bg-image bg-center bg-no-repeat bg-cover opacity-80 pb-40 pt-5">
      <div className="bg-white py-2">
        <div className="container mx-auto flex items-center justify-between">
          <div className="cursor-pointer">
            <Link href="/">
              <h1 className="text-2xl font-bold">My App</h1>
            </Link>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/auth">Sing Up</Link>
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
