import { Button, Card, CardBody } from "@nextui-org/react";
import { Award, CheckCircle, Clock, Shield } from "lucide-react";
import Image from "next/image";

export default function VerificationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Верификация предприятий</h1>

      <div className="mb-12">
        <Image
          src="/verification-page.webp"
          alt="Верификация производителей"
          width={1200}
          height={400}
          layout="responsive"
          className="rounded-lg shadow-lg"
        />
      </div>

      <p className="text-xl mb-8 text-center">
        Наш процесс верификации обеспечивает надежность и качество каждого
        производителя на платформе.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          {
            icon: <Shield className="h-12 w-12 text-primary" />,
            title: "Безопасность",
            description: "Гарантируем безопасность сделок",
          },
          {
            icon: <CheckCircle className="h-12 w-12 text-primary" />,
            title: "Качество",
            description: "Проверяем качество продукции",
          },
          {
            icon: <Clock className="h-12 w-12 text-primary" />,
            title: "Надежность",
            description: "Подтверждаем надежность поставщиков",
          },
          {
            icon: <Award className="h-12 w-12 text-primary" />,
            title: "Репутация",
            description: "Поддерживаем высокую репутацию",
          },
        ].map((item, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardBody className="items-center text-center">
              {item.icon}
              <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
              <p className="mt-2">{item.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="bg-gray-100 rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6">Процесс верификации</h2>
        <ol className="list-decimal list-inside space-y-4">
          <li>Подача заявки на верификацию</li>
          <li>Проверка документации</li>
          <li>Инспекция производства (при необходимости)</li>
          <li>Оценка качества продукции</li>
          <li>Подтверждение статуса верифицированного производителя</li>
        </ol>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">Преимущества верификации</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Повышение доверия покупателей",
            "Приоритетное размещение в каталоге",
            "Доступ к премиум-функциям платформы",
            "Специальный значок верификации",
            "Расширенная аналитика продаж",
            "Персональный менеджер аккаунта",
          ].map((item, index) => (
            <Card
              key={index}
              className="hover:shadow-md transition-shadow duration-300"
            >
              <CardBody>
                <p className="text-lg">{item}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Готовы начать?</h2>
        <Button color="primary" size="lg">
          Подать заявку на верификацию
        </Button>
      </div>
    </div>
  );
}
