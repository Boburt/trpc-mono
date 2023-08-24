/* eslint-disable react/jsx-no-comment-textnodes */
import Manufacturer11 from "@/components/manufacturer/Manufacturer";
import Image from "next/image";
import Link from "next/link";
import Filter from "@/components/Filter";

export default function Home() {
  return (
    <main>
      <Manufacturer11 />
      <Filter />
    </main>
  );
}
