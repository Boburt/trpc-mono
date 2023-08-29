import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

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
          <img
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
