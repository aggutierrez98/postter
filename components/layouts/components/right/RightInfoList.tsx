import { FollowResult } from "components";
import { Trending } from "components";

export const RightInfoList = ({ followResults, trendingResults }) => {
  return (
    <div className="">
      {" "}
      <div className="text-custom-text space-y-3 bg-custom-secondary pt-2 rounded-xl">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {followResults.map((result, index) => (
          <FollowResult key={index} result={result} />
        ))}
        <button
          className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex 
            items-center justify-between w-full text-custom-link font-light"
        >
          Show more
        </button>
      </div>
      <div className="text-custom-text space-y-3 bg-custom-secondary pt-2 rounded-xl w-full mt-2">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        {trendingResults.map((result, index) => (
          <Trending key={index} result={result} />
        ))}
        <button
          className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex 
            items-center justify-between w-full text-custom-link font-light"
        >
          Show more
        </button>
      </div>
    </div>
  );
};
