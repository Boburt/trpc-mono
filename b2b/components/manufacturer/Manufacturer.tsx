import React from "react";
import manaData from "@/app/manufacturer/data";
import Image from "next/image";

export default function Manufacturer11() {
  return (
    <div>
      <div className="mt-8">
        {manaData.map((manufacturerData) => (
          <div
            key={manufacturerData.id}
            className="card card-side bg-base-200 shadow-xl mb-8 flex"
          >
            <div className="card-body">
              <h4 className="card-title">{manufacturerData.name}</h4>
              <p>{manufacturerData.derc}</p>
            </div>
            <figure>
              <Image
                src={manufacturerData.image}
                alt={manufacturerData.specific}
                width={250}
                height={200}
                className=""
              />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
}
