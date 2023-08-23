/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image1 from "./img/audi.jpg";
import Image2 from "./img/bmw.jpg";
import Image3 from "./img/mercedes.jpg";
import Image from "next/image";

export default function Slider() {
  return (
    <Carousel className="dislay m-auto p-4">
      <div>
        <Image src={Image1} alt="Slider 1" width={100} height={100} />
        <p className="carousel-status"></p>
      </div>
      <div>
        <Image src={Image2} alt="Slider 2" width={100} height={100} />
        <p className="carousel-status"></p>
      </div>
      <div>
        <Image src={Image3} alt="Slider 3" width={100} height={100} />
        <p className="carousel-status"></p>
      </div>
    </Carousel>
  );
}
