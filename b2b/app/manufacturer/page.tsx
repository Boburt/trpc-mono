import manaData from "./data";
import Image from "next/image";

export default function Manufacturer() {
  return (
    <div>
      <h1>manufacturer</h1>

      <div>
        {manaData.map((manufacturer) => (
          <div key={manufacturer.id}>
            <Image
              src={manufacturer.image}
              alt={manufacturer.specific}
              width={500}
              height={500}
            />
            <h4>{manufacturer.name}</h4>
            <p>{manufacturer.derc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
