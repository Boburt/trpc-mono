export default function Products({
  products,
  price,
  image,
  moq,
  imageWidth,
  imageHeight,
}: {
  products: { price: string; image: string; moq: string }[];
  price: string[];
  image: string[];
  moq: string[];
  imageWidth: number;
  imageHeight: number;
}) {
  return (
    <div className="flex flex-row justify-between mt-4">
      {products.map((product, index) => (
        <div key={index} className="mr-4">
          <img
            src={product.image}
            alt="Product"
            loading="lazy"
            width={imageWidth}
            height={imageHeight}
            className="h-full"
          />
          <h4>Price: {product.price}</h4>
          <p>MOQ: {product.moq}</p>
        </div>
      ))}
    </div>
  );
}
