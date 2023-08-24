import bio from "../../public/images/frank-cone.jpg";
import imho from "../../public/images/magda-ehlers.jpg";
import mach from "../../public/images/scott-webb.jpg";
import audi from "../../public/images/audi.jpg";
import bmw from "../../public/images/bmw.jpg";
import mers from "../../public/images/mercedes.jpg";

const manufacturers = [
  {
    id: 1,
    name: "Biotexno nature",
    derc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    reyting: 5,
    specific: "- test test test",
    image: bio,
    logo: bio,
    reviews: "3",
    slider: {
      image1: audi,
      image2: bmw,
      image3: mers,
    },
  },
  {
    id: 2,
    name: "Imho Technology",
    derc: "Lorem Ipsum is simply dummy text. and typesetting industry",
    reyting: 4,
    specific: "test stes estt",
    image: imho,
    logo: imho,
    reviews: "10+",
    slider: {
      image1: audi,
      image2: bmw,
      image3: mers,
    },
  },
  {
    id: 3,
    name: "Qinglong Machinery",
    derc: "Lorem Ipsum is simply dummy text. and typesetting industry",
    reyting: 5,
    specific: "test stes estt",
    image: mach,
    logo: mach,
    reviews: "50+",
    slider: {
      image1: audi,
      image2: bmw,
      image3: mers,
    },
  },
];

export default manufacturers;
