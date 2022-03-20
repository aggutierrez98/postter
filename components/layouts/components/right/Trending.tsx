import { TrendingResultInterface } from "interfaces";
import Image from "next/image";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

interface Props {
  result: TrendingResultInterface;
}

export const Trending = ({ result }: Props) => {
  return (
    <div
      className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex 
    items-center justify-between"
    >
      <div className="space-y-0.5">
        <p className="text-custom-terciary text-xs font-medium">
          {result.heading}
        </p>
        <h6 className="font-bold max-w-[250px] text-sm">
          {result.description}
        </h6>
        <p className="text-custom-terciary text-xs font-medium max-w-[250px]">
          Trending with{" "}
          {result.tags.map((tag, index) => (
            <span className="tag" key={index}>
              {tag}
            </span>
          ))}
        </p>
      </div>

      {result.img ? (
        <Image
          src={result.img}
          width={70}
          height={70}
          objectFit="cover"
          className="rounded-2xl"
        />
      ) : (
        <div className="icon group">
          <MoreHorizOutlinedIcon className="h-5 text-custom-terciary group-hover:text-custom-link" />
        </div>
      )}
    </div>
  );
};
