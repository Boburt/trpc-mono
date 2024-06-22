export default function NewsLetter() {
  return (
    <div className="mx-4 py-8 md:py-12 grid place-content-center px-6 md:px-0">
      <div className="lg:flex justify-start lg:gap-28">
        <div className="">
          <h1 className="font-bold text-5xl text-gray-800 dark:text-white ">
            Новостная рассылка
          </h1>
          <p className="pt-8 md:pt-4 text-gray-600 dark:text-gray-200">
            Подпишитесь на нашу рассылку и получайте еженедельные обновления. Мы
            отправляем электронные письма о наших последних продуктах на рынке
            только один раз в неделю, каждую пятницу.
          </p>
          <div className="mt-8 md:flex justify-start md:gap-4">
            <input
              type="email"
              placeholder="Ваш Email"
              className="placeholder-gray-600 dark:bg-gray-800 dark:border-transparent dark:placeholder-gray-200 dark:text-white w-full md:w-1/2 p-4 grid place-items-center border rounded-md focus:outline-none"
            />
            <button className="w-full md:w-auto bg-indigo-600 dark:border-transparent text-white px-8 py-4 border rounded-md hover:bg-indigo-700 grid place-items-center font-semibold mt-4 md:mt-0 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
              Подписаться
            </button>
          </div>
          <p className="pt-4 text-xs text-gray-600 dark:text-gray-200">
            Прочитайте нашу{" "}
            <u className="cursor-pointer no-underline hover:underline">
              политику конфиденциальности
            </u>
          </p>
        </div>
        <div className="pt-8 lg:pt-0">
          <img
            src="https://i.ibb.co/4SzjWXT/pexels-andrea-piacquadio-3777566-1.png"
            alt="man in black suit holding brown paper"
            className="hidden lg:block"
          />
          <img
            src="https://i.ibb.co/W2q6bWQ/pexels-andrea-piacquadio-3777566-1-1.png"
            alt="man in black suit holding brown paper"
            className="hidden sm:block lg:hidden"
          />
          <img
            src="https://i.ibb.co/PMg7LjM/pexels-andrea-piacquadio-3777566-1sm.png"
            alt="man in black suit holding brown paper"
            className="sm:hidden"
          />
        </div>
      </div>
    </div>
  );
}
