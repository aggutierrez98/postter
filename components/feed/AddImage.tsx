import { Dispatch, SetStateAction } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Image from "next/image";

interface Props {
  file: string;
  setFile: Dispatch<SetStateAction<string>>;
}

export const AddImage = ({ file, setFile }: Props) => {
  return (
    <div className="relative">
      <div
        className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center 
        top-1 left-1 cursor-pointer z-20"
        onClick={() => setFile(null)}
      >
        <CloseOutlinedIcon className="text-white h-5" />
      </div>
      <div className="relative h-[320px]">
        <Image src={file} layout="fill" objectFit="contain" />
      </div>
    </div>
  );
};
