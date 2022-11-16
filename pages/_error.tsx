import { useToogleTheme, useTranslation } from "hooks";
import { GetStaticProps } from "next";

const CustomErrorPage = () => {
  const { t } = useTranslation();
  useToogleTheme();

  return (
    <div className="p-12 h-screen w-screen bg-custom-primary">
      <div className="flex flex-col m-2 items-center justify-center h-4/5">
        <h1 className="font-bold text-5xl sm:text-5xl 2xl:text-7xl text-red-500">
          {t("error_quote")}
        </h1>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const trendingResults = await fetch("https://www.jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://www.jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );

  return {
    props: {
      trendingResults,
      followResults,
    },
  };
};

export default CustomErrorPage;
