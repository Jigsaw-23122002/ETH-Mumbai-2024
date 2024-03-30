import Image from "next/image";
import Link from "next/link";

/**
 * Site header
 */
export const Card = ({
  num,
  name,
  description,
  src,
  link,
}: {
  num: number;
  name: string;
  description: string;
  src: string;
  link: string;
}) => {
  return (
    <div className="flex flex-col lg:w-1/3 max-w-xs shadow-lg bg-white rounded-[46px] p-5 py-8 mt-4">
      <div className="flex w-full h-[150px] relative">
        <Image src={src} fill alt="Match" className="w-full object-center object-cover rounded-lg" />
      </div>
      <div className="mb-4">
        <span className="text-gray-700 font-thin text-xs">Match #{num}</span>
        <h3 className="text-gray-700 text-lg m-0 mb-2">{name}</h3>
        <p className="text-gray-700 m-0 text-sm">{description}</p>
      </div>
      <Link id={name} href={link} className="btn btn-accent btn-sm md:self-start rounded-3xl mt-auto hover:opacity-100">
        Play Match
      </Link>
    </div>
  );
};
