import { FollowResultInterface, TrendingResultInterface } from "interfaces";
import { useEffect, useState } from "react";
import { RightInfoList } from "components";
import { SearchBar } from "components";

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
      <SearchBar />
      <div className="sticky mt-1 top-0">
        <RightInfoList
          trendingResults={trendingResults}
          followResults={followResults}
        />
      </div>
    </div>
  );
};
