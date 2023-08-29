import { Image } from "astro:assets";

export default function Logo({
  logos,
  logoWidth,
  logoHeight,
}: {
  logos: string;
  logoWidth: number;
  logoHeight: number;
}) {
  return (
    <div className="">
      <img
        className="rounded-md"
        src={logos}
        width={logoWidth}
        height={logoHeight}
        alt="Logo"
      />
    </div>
  );
}
