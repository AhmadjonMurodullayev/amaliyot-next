import Image from "next/image";

function Banner({ image }: { image: string }) {
  return (
    <Image
      src={image}
      alt="banner"
      width={1000}
      height={100}
      className="rounded-lg transition-transform duration-300 hover:scale-105"
    />
  );
}

export default Banner;
