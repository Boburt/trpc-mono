"use client";
import React from "react";
import type { Metadata } from "next";
import manaData from "@/app/pages/manufacturer/data";
import Image from "next/image";
import Slider from "../slider/Slider";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manufacturer",
  description: "...",
};

export default function Manufacturer11() {
  return (
    <div>
      <div className="container mx-auto mt-8">
        {manaData.map((manufacturerData: any) => (
          <div
            key={manufacturerData.id}
            className="card card-side bg-base-200 shadow-xl mb-8 flex justify-between"
          >
            <div className="">
              <div className="hero-content flex-col lg:flex-row">
                <Image
                  src={manufacturerData.logo}
                  className="rounded-lg w-16 h-16"
                  alt={manufacturerData.name}
                />
                <div>
                  <h4 className="text-2xl font-bold mb-4 underline">
                    <Link href={`/manafacture/${manufacturerData.name}`}>
                      {manufacturerData.name}
                    </Link>
                  </h4>
                  <p className="">{manufacturerData.derc}</p>
                </div>
              </div>
              <div className="card-body">
                <h6 className="font-light">Rating and revews</h6>
                <p>
                  <span className="font-semibold">
                    {manufacturerData.reyting}
                  </span>
                  /5 ({manufacturerData.reviews} reviews)
                </p>
                <h4 className="font-light ">Factory capabilities</h4>
                <ul
                  role="list"
                  className="list-inside list-disc text-sm font-bold"
                >
                  <li>Competitive OEM factory</li>
                  <li>Cooperated suppliers (215)</li>
                  <li>Finished product inspection</li>
                  <li>Supplier assessment procedures</li>
                </ul>
              </div>
            </div>
            <div className="">
              <div className="flex justify-end mt-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                  className="h-4 w-4 fill-slate-400 hover:fill-slate-700 cursor-pointer active:fill-orange-500 my-auto mr-4"
                >
                  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>

                <button className="btn btn-outline rounded-full mr-4 text-[12px] font-bold	">
                  Chat now
                </button>

                <button className="btn btn-outline rounded-full mr-4 text-[12px] font-bold	">
                  Contact us
                </button>
              </div>
              <Slider />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
