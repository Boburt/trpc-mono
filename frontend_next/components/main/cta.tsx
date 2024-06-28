"use client";
import { motion } from "framer-motion";
import { AuroraBackground } from "../ui/aurora-background";
import { FlipWords } from "../ui/flip-words";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

export default function Cta() {
  const words = ["тканями", "текстилем", "изделиями"];
  const placeholders = [
    "Детская одежда из органического хлопка",
    "Спортивные костюмы для фитнеса",
    "Рабочие перчатки с усиленной защитой",
    "Антибактериальные медицинские халаты",
    "Постельное белье премиум класса",
    "Ткань для пошива вечерних платьев",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-6xl mx-auto font-normal text-center text-neutral-600 dark:text-neutral-400">
          Откройте новые возможности <br /> с нашими
          <FlipWords words={words} />
        </div>
        <div className="my-4 max-w-2xl w-full">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
