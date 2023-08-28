import React, { useState } from "react";

export default function Like({}) {
  const [toggle, setToggle] = useState(true);

  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <div className="flex justify-between mt-5">
      <svg
        onClick={handleClick}
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
        className={
          toggle
            ? "h-4 w-4 fill-slate-400 hover:fill-slate-500 cursor-pointer my-auto mr-4"
            : "h-4 w-4 fill-orange-400 hover:fill-orange-500 cursor-pointer my-auto mr-4 animate-jump animate-once animate-duration-500 animate-ease-linear animate-normal animate-fill-backwards "
        }
      >
        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
      </svg>
      <button className="btn btn-outline rounded-full my-auto mr-4 text-[12px] font-bold 	">
        Chat now
      </button>
      <button className="btn btn-outline rounded-full my-auto mr-4 text-[12px] font-bold	">
        Contact us
      </button>
    </div>
  );
}
