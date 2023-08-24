/* eslint-disable react/jsx-no-comment-textnodes */
import Image from "next/image";
import Link from "next/link";
import Filter from "@/components/Filter";
import Proez from "@/components/Proezvoditel";

export default function Home() {
  return (
    <main>
      <Proez />
      <Filter />
    </main>
  );
}
