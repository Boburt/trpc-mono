export default function HasNoPermission() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">
        Извините, у вас нет доступа к этой странице.
      </h1>
      <p className="text-lg text-gray-500">
        Пожалуйста, обратитесь к администратору для получения помощи.
      </p>
    </div>
  );
}
