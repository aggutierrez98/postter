import { MainLayout } from "components";
import { useTranslation } from "hooks";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { ReactElement } from "react";

const origin = typeof window === "undefined" ? "" : window.location.origin;

const Custom404 = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("page_not_found")}</title>
        <meta name="description" content={t("meta_not_found_description")} />
        <meta property="og:title" content={t("page_not_found")} />
        <meta
          property="og:description"
          content={t("meta_not_found_description")}
        />
        <meta name="og:image" content={`${origin}/banner.jpg`} />
      </Head>
      <section className="flex items-center justify-center flex-col h-[250px] w-full">
        <h2 className="text-custom-text text-2xl">{t("page_not_found")}</h2>
        <Link href="/" passHref>
          <button className="mt-4 flex py-2 px-4 bg-custom-alternative rounded-full text-custom-text hover:opacity-80 transition-all">
            {t("back_to_main_page")}
          </button>
        </Link>
      </section>
    </>
  );
};

Custom404.getLayout = function getLayout(page: ReactElement) {
  const { trendingResults, followResults } = page.props;

  return (
    <MainLayout trendingResults={trendingResults} followResults={followResults}>
      {page}
    </MainLayout>
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

export default Custom404;
