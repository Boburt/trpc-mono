export default function Blog() {
  const data = [
    {
      id: "1",
      created_at: "2024-01-15",
      title: "Современные тенденции в текстильной промышленности",
      preview_text:
        "Откройте для себя последние тенденции в текстильной промышленности, от устойчивых материалов до инновационных технологий.",
      detail_text:
        "Текстильная промышленность претерпевает значительные изменения благодаря новым технологиям и устойчивым материалам. Компании внедряют экосознанные методы производства, а инновационные технологии, такие как 3D-печать и умные ткани, становятся все более популярными. Эти технологии позволяют создавать материалы с новыми свойствами, которые могут изменить нашу повседневную жизнь. Среди основных тенденций можно выделить использование переработанных материалов, внедрение цифровых технологий в производство и акцент на экологичность продукции.",
      image_url:
        "https://media.istockphoto.com/id/155908292/photo/textile-factory.jpg?s=1024x1024&w=is&k=20&c=Wll3ZygdxZYL71fynPUZjgTtYQSjLidIAlUidftQicU=",
    },
    {
      id: "2",
      created_at: "2024-02-10",
      title: "Влияние экологии на производство текстиля",
      preview_text:
        "Узнайте, как экологические факторы влияют на производство текстиля и какие меры принимаются для снижения их воздействия.",
      detail_text:
        "Экологические факторы играют ключевую роль в текстильной промышленности. Компании стремятся сократить выбросы CO2, уменьшить потребление воды и использовать переработанные материалы. Снижение экологического воздействия становится приоритетом для многих производителей, и они внедряют инновационные методы, такие как водосберегающие технологии и безопасные для окружающей среды красители. Эти меры не только помогают сохранить природу, но и делают продукцию более привлекательной для потребителей, которые заботятся о будущем планеты.",
      image_url:
        "https://media.istockphoto.com/id/1422209464/photo/recycling-products-concept-organic-cotton-recycled-cloth-zero-waste-materials-environment.jpg?s=1024x1024&w=is&k=20&c=jQH1hleyRxChOOzQjlR9Dka7LkCDeZ4FJv0fc39n64k=",
    },
    {
      id: "3",
      created_at: "2024-03-05",
      title: "Будущее текстильных материалов",
      preview_text:
        "Погрузитесь в будущее текстильных материалов и узнайте о новых разработках, которые могут изменить рынок.",
      detail_text:
        "Разработчики текстильных материалов продолжают удивлять новыми решениями, такими как биоразлагаемые ткани, умные материалы с изменяющимися свойствами и синтетические волокна, которые имитируют природные структуры. Биоразлагаемые ткани, например, позволяют создавать продукцию, которая разлагается после использования, не оставляя отходов. Умные материалы могут изменять свои свойства в зависимости от условий, обеспечивая дополнительный комфорт и функциональность. Эти инновации открывают новые возможности для применения текстильных материалов в различных отраслях, от моды до медицины.",
      image_url:
        "https://media.istockphoto.com/id/1383985960/photo/cloth-design-element-isolated-piece-of-blowing-fabric-banner-elegant-textiles-3d-rendering.jpg?s=1024x1024&w=is&k=20&c=el5uHElpz37hT9GPXW8G8ALH7s1Am2HhWmbzy5o8IAo=",
    },
    {
      id: "4",
      created_at: "2024-04-20",
      title: "История текстильной промышленности",
      preview_text:
        "Познакомьтесь с богатой историей текстильной промышленности, от древних времён до современности.",
      detail_text:
        "Текстильная промышленность имеет долгую и увлекательную историю, начиная с первых ткацких станков и заканчивая современными фабриками. В разные эпохи текстиль играл важную роль в экономике и культуре различных стран. В древности ткани производились вручную, и процесс изготовления был трудоемким и долгим. С развитием технологий появились механизированные ткацкие станки, что значительно ускорило производство и снизило его стоимость. Сегодня текстильная промышленность является одной из самых инновационных и динамично развивающихся отраслей, постоянно внедряя новые технологии и материалы.",
      image_url:
        "https://media.istockphoto.com/id/183363062/photo/sericulture.jpg?s=1024x1024&w=is&k=20&c=eHIccQzwn2LCcW4tedBWb6SNdYKRGNUtSfGZasD7PhY=",
    },
    {
      id: "5",
      created_at: "2024-05-15",
      title: "Текстиль и мода: вечный союз",
      preview_text:
        "Исследуйте, как текстильные инновации влияют на мир моды и стиль.",
      detail_text:
        "Текстиль и мода всегда шли рука об руку. Новые материалы и технологии позволяют дизайнерам создавать уникальные и инновационные коллекции, которые не только красиво выглядят, но и предлагают новые функциональные возможности. Использование современных текстильных материалов, таких как умные ткани и переработанные материалы, позволяет создавать одежду, которая не только стильная, но и удобная в носке, а также экологически безопасная. Эти инновации меняют моду, делая её более адаптивной и устойчивой, что привлекает внимание как дизайнеров, так и потребителей.",
      image_url:
        "https://media.istockphoto.com/id/520137102/photo/tailors-office.webp?s=2048x2048&w=is&k=20&c=14LqhNx1GuxvtavnDfKaQq_VDriduEYzuRSqCLos-uU=",
    },
    {
      id: "6",
      created_at: "2024-06-10",
      title: "Умные ткани: революция в текстиле",
      preview_text:
        "Узнайте о последних достижениях в области умных тканей и их применении в различных отраслях.",
      detail_text:
        "Умные ткани становятся всё более популярными благодаря своим уникальным свойствам, таким как изменение цвета, терморегуляция и встроенные датчики. Эти материалы находят применение в медицине, спорте, и даже в военной сфере. Например, умные ткани могут изменять цвет в зависимости от температуры или освещения, обеспечивая дополнительную функциональность и эстетику. В медицине такие материалы могут использоваться для мониторинга состояния здоровья пациентов. Эти инновации открывают новые возможности для применения текстильных материалов и меняют представление о том, что может быть достигнуто с их помощью.",
      image_url:
        "https://media.istockphoto.com/id/1249498817/photo/man-and-future-online-shopping-ar-augmented-reality-technology-on-smart-mobile-phone-e.webp?s=2048x2048&w=is&k=20&c=s5yRynwu1bW7H4Yb-8MuceUS6rrU1nkAO0xgVbxcYoM=",
    },
    {
      id: "7",
      created_at: "2024-07-25",
      title: "Секреты выбора качественного текстиля",
      preview_text:
        "Научитесь выбирать качественный текстиль для дома и одежды, основываясь на ключевых критериях.",
      detail_text:
        "Выбор качественного текстиля может быть сложной задачей. Важно учитывать такие факторы, как состав материала, плотность ткани, её прочность и устойчивость к износу. Для дома лучше выбирать натуральные материалы, такие как хлопок или лён, которые обеспечивают комфорт и долговечность. Для одежды важно обращать внимание на состав ткани, чтобы она была удобной в носке и легко стиралась. Эти советы помогут вам сделать правильный выбор и приобрести текстильные изделия, которые будут радовать вас своей качеством и долговечностью.",
      image_url:
        "https://media.istockphoto.com/id/1437255705/photo/woman-choosing-samples-of-fabric-for-curtain-in-textile-store-customer-combining-colors-and.webp?s=2048x2048&w=is&k=20&c=1AOpJyGVKe2GHKkSoimzg-Yw3wd73RI04gaVINyqtIA=",
    },
    {
      id: "8",
      created_at: "2024-08-18",
      title: "Переработка текстиля: шаг к устойчивому будущему",
      preview_text:
        "Узнайте, как переработка текстиля помогает снизить нагрузку на окружающую среду и какие методы используются.",
      detail_text:
        "Переработка текстиля становится всё более актуальной задачей в борьбе за экологическое будущее. Существуют различные методы переработки, такие как механическое и химическое разложение тканей. Механическая переработка включает измельчение старых тканей и их повторное использование для создания новых изделий. Химическая переработка позволяет разлагать ткани на молекулярном уровне и создавать новые материалы. Эти методы помогают снизить количество текстильных отходов и делают производство более устойчивым и экологически безопасным.",
      image_url:
        "https://media.istockphoto.com/id/1296510341/photo/recycle-clothes-concept-recycling-box-full-of-clothes.webp?s=2048x2048&w=is&k=20&c=QNt3dkeX6CFgmWx1vWC5yVtxjU-ObAYfzSvizZFHOnA=",
    },
    {
      id: "9",
      created_at: "2024-09-12",
      title: "Текстильная промышленность и цифровизация",
      preview_text:
        "Откройте для себя, как цифровые технологии изменяют текстильную промышленность и что это значит для будущего.",
      detail_text:
        "Цифровизация проникает во все сферы текстильной промышленности, от производства до дистрибуции. Использование цифровых технологий позволяет оптимизировать процессы, повысить качество продукции и предложить потребителям новые возможности. Например, цифровые технологии позволяют создавать виртуальные прототипы тканей и одежды, что значительно сокращает время и затраты на разработку новых коллекций. Также они позволяют более точно контролировать качество продукции на всех этапах производства. Эти изменения делают текстильную промышленность более гибкой и адаптивной, открывая новые возможности для роста и развития.",
      image_url:
        "https://media.istockphoto.com/id/1391408732/vector/digital-transformation-digitization-of-business-processes-and-modern-technology-wireframe.webp?s=2048x2048&w=is&k=20&c=4LQK_Onmat03XPUI8OOQCwS8UQdfSpJTv3nMQ4gd6-g=",
    },
    {
      id: "10",
      created_at: "2024-10-05",
      title: "Роль текстиля в интерьере",
      preview_text:
        "Исследуйте, как текстильные изделия могут преобразить интерьер вашего дома и создать уютную атмосферу.",
      detail_text:
        "Текстиль играет важную роль в дизайне интерьера. Правильный выбор тканей для штор, мебели и декора позволяет создать уютную и стильную обстановку, которая будет радовать вас и ваших гостей каждый день. Выбирая текстиль для интерьера, важно учитывать его цвет, текстуру и качество. Натуральные материалы, такие как хлопок и лён, создают теплую и уютную атмосферу, а яркие цвета и узоры могут добавить интерьеру индивидуальности. С помощью текстильных изделий можно легко обновить интерьер и придать ему новый вид без больших затрат.",
      image_url:
        "https://media.istockphoto.com/id/485624142/photo/architects-interior-designer-hands-working-with-tablet-computer-material-sample.webp?s=2048x2048&w=is&k=20&c=D-vhRa9c0cK5bJSKvbL1tRK1L7UqyVRKUyJuwylAe8A=",
    },
  ];

  return (
    <div className="container my-24 mx-auto md:px-6">
      <section className="mb-32">
        <h2 className="mb-16 text-center text-2xl font-bold">Blog</h2>
        {data.map((item, index) => (
          <div
            key={index}
            className={`mb-16 flex flex-wrap ${
              index % 2 !== 0 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="mb-6 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-6/12 lg:pr-6">
              <div
                className="ripple relative overflow-hidden rounded-lg bg-cover bg-[50%] bg-no-repeat shadow-lg dark:shadow-black/20"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <img src={item.image_url} className="w-full" alt="Louvre" />
                <a href={`/blog/${item.id}`}>
                  <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98.4%,0.2)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                </a>
              </div>
            </div>

            <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12 lg:pl-6">
              <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
              <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
                Published <u>{item.created_at}</u>
              </p>
              <p className="mb-6 text-neutral-500 dark:text-neutral-300">
                {item.detail_text}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
