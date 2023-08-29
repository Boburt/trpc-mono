import dbData from "../../public/manafacturer.json";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ManufactureCard } from "./manufacturers/Card";

export default function Proez() {
  return (
    <div className="relative mt-8 flex flex-col">
      {dbData.map((item: any) => (
        <ManufactureCard item={item} key={item.id} />
      ))}
    </div>
  );
}
