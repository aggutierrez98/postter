import { FollowResult } from "components";
import { Trending } from "components";
import { useTranslation } from "hooks";
import {
  FollowResultInterface,
  TrendingResultInterface,
} from "interfaces/index";

export const RightInfoList = ({ followResults, trendingResults }) => {
  const { t } = useTranslation();

  return (
    <div className="">
      <section className="text-custom-text space-y-3 bg-custom-secondary pt-2 rounded-xl">
        <h4 className="font-bold text-xl px-4">{t("who_to_follow")}</h4>
        {followResults.map((result: FollowResultInterface, index: number) => (
          <FollowResult key={index} result={result} />
        ))}
        <button
          className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex 
            items-center justify-between w-full text-custom-link font-light"
        >
          {t("show more")}
        </button>
      </section>
      <section className="text-custom-text space-y-3 bg-custom-secondary pt-2 rounded-xl w-full mt-2">
        <h4 className="font-bold text-xl px-4">{t("whats_happening")}</h4>
        {trendingResults.map(
          (result: TrendingResultInterface, index: number) => (
            <Trending key={index} result={result} />
          )
        )}
        <button
          className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex 
            items-center justify-between w-full text-custom-link font-light"
        >
          {t("show more")}
        </button>
      </section>
    </div>
  );
};
