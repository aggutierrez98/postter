import { FollowResult } from "./FollowResult";
import { Trending } from "./Trending";

export const RightInfoList = ({ followResults, trendingResults }) => {
  return (
    <div className="">
      {" "}
      <div className="text-text space-y-3 bg-secondary pt-2 rounded-xl">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {followResults.map((result, index) => (
          <FollowResult key={index} result={result} />
        ))}
        <button
          className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex 
            items-center justify-between w-full text-link font-light"
        >
          Show more
        </button>
      </div>
      <div className="text-text space-y-3 bg-secondary pt-2 rounded-xl w-full mt-2">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        {trendingResults.map((result, index) => (
          <Trending key={index} result={result} />
        ))}
        <button
          className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex 
            items-center justify-between w-full text-link font-light"
        >
          Show more
        </button>
      </div>
    </div>
  );
};
