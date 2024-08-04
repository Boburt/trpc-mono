import { BadgeCheck, ListTodo, Scale, Scissors, Truck } from "lucide-react";
import Image from "next/image";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";
const features = [
  {
    Icon: BadgeCheck,
    name: "Верификация предприятий",
    description:
      "Подтверждение подлинности и надежности предприятий для безопасного сотрудничества",
    href: "/verification",
    // cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute right-0 top-0 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105">
        <Image
          src="/bento-grid/verification_illustration.webp"
          alt="Верификация предприятий"
          width={600}
          height={400}
          layout="responsive"
        />
      </div>
    ),
  },
  {
    Icon: Scissors,
    name: "Услуги модельер-конструктор",
    description: "Создание уникальных дизайнов и лекал для вашей продукции",
    href: "/design",
    // cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute top-0 left-0 w-full [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]">
        <Image
          src="/bento-grid/design.webp"
          alt="Услуги модельер-конструктор"
          width={300}
          height={200}
          layout="responsive"
        />
      </div>
    ),
  },
  {
    Icon: ListTodo,
    name: "Услуги отдела технического контроля",
    description:
      "Обеспечение высоких стандартов качества на всех этапах производства",
    href: "/quality-control",
    // cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute right-0 top-0 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105">
        <Image
          src="/bento-grid/otk.webp"
          alt="Услуги отдела технического контроля"
          width={300}
          height={200}
          layout="responsive"
        />
      </div>
    ),
  },
  {
    Icon: Truck,
    name: "Логистика",
    description: "Эффективная доставка сырья и готовой продукции по всему миру",
    href: "/shipping",
    // cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute right-0 top-0 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105">
        <Image
          src="/bento-grid/logistics.webp"
          alt="Поддержка инвестиций"
          width={600}
          height={400}
          layout="responsive"
        />
      </div>
    ),
  },
  {
    Icon: Scale,
    name: "Юридическое обслуживание",
    description:
      "Комплексная правовая поддержка для уверенного развития вашего предприятия",
    href: "/law",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute right-0 top-0 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105">
        <Image
          src="/bento-grid/law.webp"
          alt="Поддержка инвестиций"
          width={600}
          height={400}
          layout="responsive"
        />
      </div>
    ),
  },
];

export function FeaturesGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Комплексные решения для вашего текстильного бизнеса
      </h2>
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}
