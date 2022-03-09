import { Dispatch, SetStateAction } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface Props {
  file: string;
  setFile: Dispatch<SetStateAction<string>>;
}

export const AddImage = ({ file, setFile }: Props) => {
  return (
    <div className="relative">
      <div
        className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
        onClick={() => setFile(null)}
      >
        <CloseOutlinedIcon className="text-white h-5" />
      </div>
      <img
        src={file}
        alt="Imagen seleccionada"
        className="rounded-2xl max-h-80 object-contain"
      />
    </div>
  );
};
