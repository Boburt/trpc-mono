"use client";

import React from "react";
import Image from "next/image";

export default function Products({
  products,
  price,
  moq,
  image,
}: {
  products: string[];
  price: string[];
  moq: string[];
  image: string[];
}) {
  if (!products) {
    return <div>No products to display.</div>;
  }
  return (
    <div>
      {products.map((product, index) => (
        <div key={index}>
          <Image src={image[index]} alt={moq[index]} width={100} height={100} />
        </div>
      ))}
    </div>
  );
}
