/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

export default function Slider({
  images,
  imageWidth,
  imageHeight,
}: {
  images: string[];
  imageWidth: number;
  imageHeight: number;
}) {
  return (
    <Carousel className="dislay m-auto p-4">
      {images.map((image, index) => (
        <div key={index}>
          <Image
            src={image}
            width={imageWidth}
            height={imageHeight}
            alt="Slider"
          />
          <p className="carousel-status"></p>
        </div>
      ))}
    </Carousel>
  );
}
