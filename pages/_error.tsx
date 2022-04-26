import { useTranslation } from "hooks";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

const CustomErrorPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="p-12 h-screen w-screen bg-custom-primary">
      <div className="flex flex-col m-2 items-center justify-center h-4/5">
        <h1 className="font-bold text-5xl sm:text-5xl 2xl:text-7xl text-red-500">
          {t("error_quote")}
        </h1>
        <div className="flex text-[18px] mt-10">
          <p className="text-custom-text">{t("back_to_main_page")}: </p>
          <button
            className="ml-2 underline text-custom-link"
            onClick={() => {
              if (router.pathname === "/") window.location.reload();
              else router.push("/");
            }}
          >
            {t("click_here")}
          </button>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
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
