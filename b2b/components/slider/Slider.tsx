/* eslint-disable @next/next/no-img-element */
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image1 from "../app/manufacturer/img/frank-cone.jpg";
import Image2 from "../app/manufacturer/img/magda-ehlers.jpg";
import Image3 from "../app/manufacturer/img/scott-webb.jpg";
import Image from "next/image";

export default function Slider() {
  return (
    <Carousel>
      <div>
        <img src="../app/manufacturer/img/frank-cone.jpg" alt="" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src="../app/manufacturer/img/magda-ehlers.jpg" alt="" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src="../app/manufacturer/img/scott-webb.jpg" alt="" />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
}
