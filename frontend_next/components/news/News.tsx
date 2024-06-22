import { Card, CardFooter, Image } from "@nextui-org/react";
import dayjs from "dayjs";
import Link from "next/link";

import "dayjs/locale/ru";

dayjs.locale("ru");
export default function News() {
  const list = [
    {
      id: "1",
      created_at: "2024-06-22T08:00:00Z",
      title: "Рост экспорта текстиля Узбекистана в первые месяцы 2024 года",
      description:
        "В первые два месяца 2024 года экспорт текстильной продукции Узбекистана достиг 519,4 миллиона долларов США, что представляет собой значительное увеличение. Основные компоненты экспорта включают готовую текстильную продукцию и пряжу. За этот период различные виды текстиля экспортировались в 52 страны мира.",
      short_desc:
        "Экспорт текстиля Узбекистана вырос до 519,4 миллиона долларов в начале 2024 года.",
      image:
        "https://daryo.uz/static/2024/03/25/Uzbekistan-garment-industry-6Ly3wdlZ.jpg",
    },
    {
      id: "2",
      created_at: "2024-06-22T09:00:00Z",
      title:
        "Узбекистан проведет две международные текстильные конференции в 2024 году",
      description:
        "С 8 по 10 сентября 2024 года в Самарканде пройдет совместная конференция двух крупных международных текстильных федераций — Международной Федерации Текстильных Производителей (ITMF) и Международной Федерации Моды (IAF). Ожидается участие более 1000 ключевых фигур мировой текстильной индустрии.",
      short_desc:
        "В Самарканде пройдет международная текстильная конференция в сентябре 2024 года.",
      image:
        "https://static.fibre2fashion.com/Newsresource/images/294/adobestock-766590872_305648.jpeg",
    },
    {
      id: "3",
      created_at: "2024-06-22T10:00:00Z",
      title:
        "Экспорт текстиля Узбекистана достиг 2,33 миллиарда долларов США в 2023 году",
      description:
        "В 2023 году экспорт текстильной продукции из Узбекистана достиг 2,33 миллиарда долларов США, что составляет 13,2% от общего экспорта страны за этот период. Узбекистан экспортировал текстильную продукцию в 58 стран, демонстрируя значительное присутствие на международном рынке.",
      short_desc:
        "Экспорт текстиля Узбекистана в 2023 году составил 2,33 миллиарда долларов США.",
      image:
        "https://kohantextilejournal.com/wp-content/uploads/2023/12/086A1354.webp",
    },
    {
      id: "4",
      created_at: "2024-06-22T11:00:00Z",
      title: "Узбекистан активно поддерживает текстильную отрасль",
      description:
        "Узбекское правительство активно поддерживает текстильную отрасль, предоставляя финансирование для непрерывного обеспечения оборотного капитала предприятиям, занимающимся экспортом текстиля. К 2027 году планируется увеличить ежегодный экспорт текстиля до 10 миллиардов долларов.",
      short_desc:
        "Правительство Узбекистана поддерживает текстильную отрасль с целью увеличения экспорта до 10 миллиардов долларов к 2027 году.",
      image:
        "https://kohantextilejournal.com/wp-content/uploads/2023/12/photo_2023-12-21_16-31-40-768x768.webp",
    },
    {
      id: "5",
      created_at: "2024-06-22T12:00:00Z",
      title:
        "Интервью с представителями Uztextileprom о будущем текстильной промышленности",
      description:
        "Текстильный сектор в Узбекистане демонстрирует значительный рост, с более чем 12,000 компаниями и более 600,000 сотрудников. Ежегодный экспорт текстиля составляет 3,5 миллиарда долларов США, и значительные инвестиции в отрасль достигли 3,8 миллиарда долларов.",
      short_desc:
        "Текстильная промышленность Узбекистана растет благодаря значительным инвестициям и экспорту.",
      image:
        "https://uztextile.uz/wp-content/uploads/2020/03/3xWj4W-J9-QugEpDTEJJFPPMKM6AQ_CX.jpg",
    },
  ];
  return (
    <div className=" md:px-6 px-4 py-12">
      <div className="flex flex-col">
        <h1 className="lg:text-4xl text-3xl font-bold  text-gray-800 dark:text-white mb-4">
          Новости
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {list.map((item, index) => {
          return (
            <Card className="h-[300px]" isBlurred key={index} isFooterBlurred>
              <CardFooter className="absolute bottom-0 z-10 pb-0 pt-2 px-4 flex-col items-start bg-black/60 border-b-1 border-default-600 dark:border-default-100">
                <Link
                  className="uppercase font-bold text-default-100"
                  href={`/news/${item.id}`}
                >
                  {item.title}
                </Link>
                <div className="flex justify-end pb-4 w-full">
                  <small className="text-default-200 text-end">
                    {dayjs(item.created_at).format("DD MMM YYYY")}
                  </small>
                </div>
              </CardFooter>
              <Image
                removeWrapper
                alt="Card background"
                width="100%"
                className="z-0 w-full h-full object-cover"
                src={item.image}
                // height={50}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
