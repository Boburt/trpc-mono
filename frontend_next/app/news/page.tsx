export default function News() {
  return (
    <>
      <div className="lg:px-20 md:px-6 px-4 py-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="lg:text-4xl text-3xl font-bold text-center text-gray-800 dark:text-white ">
            News
          </h1>
          <p className="text-base leading-6 mt-4 text-center text-gray-600 dark:text-white  2xl:w-2/5 ">
            Here is why you should trust us with your work achievements
          </p>
        </div>
        <div className="w-full lg:flex items-center gap-6 mt-10">
          <div>
            <div className="bg-white dark:bg-gray-800  border rounded-md border-gray-200 dark:border-gray-700  relative sm:p-10 p-6">
              <p className="text-lg leading-6 text-gray-600 dark:text-white  mt-4">
                Title
              </p>
              <p className="text-base leading-6 text-gray-600 dark:text-white  mt-4">
                When our designs need an expert opinion or approval, I know I
                can rely on your agency Thank you for all your help-I will be
                recommending you to everyone
              </p>
              <div className="absolute bottom-0 -mb-4 ml-10">
                <img
                  className="dark:hidden"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonials-4-svg2.svg"
                  alt="sharp"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 md:mx-12 py-8 md:py-12 grid place-content-center px-4 md:px-0">
        <div className="lg:flex justify-start lg:gap-28">
          <div className="">
            <h1 className="font-bold text-5xl text-gray-800 dark:text-white ">
              Newsletter
            </h1>
            <p className="pt-8 md:pt-4 text-gray-600 dark:text-gray-200">
              Sign up for our newsletter and get weekly updates. We only send
              emails about our latest products on the market once a week every
              Friday.
            </p>
            <div className="mt-8 md:flex justify-start md:gap-4">
              <input
                type="email"
                placeholder="Your Email"
                className="placeholder-gray-600 dark:bg-gray-800 dark:border-transparent dark:placeholder-gray-200 dark:text-white w-full md:w-1/2 p-4 grid place-items-center border rounded-md focus:outline-none"
              />
              <button className="w-full md:w-auto bg-indigo-600 dark:border-transparent text-white px-8 py-4 border rounded-md hover:bg-indigo-700 grid place-items-center font-semibold mt-4 md:mt-0 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                Subscribe
              </button>
            </div>
            <p className="pt-4 text-xs text-gray-600 dark:text-gray-200">
              Read our{" "}
              <u className="cursor-pointer no-underline hover:underline">
                privacy policy
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
    </>
  );
}
