import { PostwittInterface } from "../interfaces/index";
import { Postwitt } from "./Postwitt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
export const HashtagPostwittsList = ({ hashtag, postwitts }) => {
  const router = useRouter();

  return (
    <div className=" border-l border-r border-secondary min-h-full">
      <div
        className="flex items-center px-1.5 py-2 border-b border-secondary text-white font-semibold 
        text-xl gap-x-4 sticky top-0 z-50 bg-primary"
      >
        <div
          className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
          onClick={() => {
            router.back();
            router.push("/");
          }}
        >
          <ArrowBackIcon className="h-5 text-white" />
        </div>
        <div className="flex flex-col">
          {hashtag}
          <span className="text-placeholder leading-[10px] text-[13px]">
            {postwitts.length} Postwitts
          </span>
        </div>
      </div>
      <div className="pb-72">
        {postwitts.map((postwitt: PostwittInterface) => {
          return (
            <Postwitt
              key={postwitt.id}
              postwittId={postwitt.id}
              postwitt={postwitt}
            />
          );
        })}
      </div>
    </div>
  );
};
