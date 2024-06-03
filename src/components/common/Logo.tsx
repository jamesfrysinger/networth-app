import { FC } from "react";

interface ILogo {
  large?: boolean;
}
const Logo: FC<ILogo> = ({ large }) => {
  return (
    <h1
      className="flex justify-center items-center border-[1px] border-red-400 dark:border-red-300 rounded-xl size-[40px]"
      style={{
        transform: `scale(${large ? 2 : 1}) translateY(${
          large ? "-25%" : "0"
        })`,
      }}
    >
      <span className="text-md font-black tracking-[-1.5px] mt-[2px] ml-[-1px]">
        NW
      </span>
    </h1>
  );
};

export default Logo;
