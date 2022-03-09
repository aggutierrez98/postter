import { ReactElement } from "react";
import { MainLayout } from "../components/layouts/MainLayout";

function getLayout(page: ReactElement) {
  const { providers, trendingResults, followResults } = page.props;

  return (
    <MainLayout
      providers={providers}
      trendingResults={trendingResults}
      followResults={followResults}
    >
      {page}
    </MainLayout>
  );
}

export default getLayout;
