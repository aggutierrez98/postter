import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { FollowResultInterface, TrendingResultInterface } from "interfaces";
import { useEffect, useState } from "react";
import { RightInfoList } from "./RightInfoList";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
}

export const RightSidebar = ({ trendingResults, followResults }: Props) => {
  const [height, setHeight] = useState(0);

  const updateHeight = () => {
    setHeight(document?.getElementById("main")?.scrollHeight);
  };

  useEffect(() => {
    window.addEventListener("wheel", updateHeight);
    return () => window.removeEventListener("wheel", updateHeight);
  }, [height]);

  return (
    <div
      style={{
        height: height + "px",
      }}
      className="hidden lg:inline ml-8 w-[32%] xl:w-[350px] overflow-visible"
    >
      <div className="top-0 bg-primary z-50 flex items-center h-[52px] opacity-95 sticky w-full">
        <div className="flex items-center justify-start bg-secondary rounded-full relative h-[42px] w-full">
          <SearchOutlinedIcon className="text-terciary h-[24px] w-[24px] ml-4" />
          <input
            type="text"
            className="bg-transparent placeholder-placeholder outline-none text-text absolute inset-0 pl-12 border
            border-transparent w-full focus:border-terciary rounded-full focus:bg-background focus:shadow-lg"
            placeholder="Search Postter"
          />
        </div>
      </div>
      <div className="sticky mt-1 top-0">
        <RightInfoList
          trendingResults={trendingResults}
          followResults={followResults}
        />
      </div>
    </div>
  );
};
