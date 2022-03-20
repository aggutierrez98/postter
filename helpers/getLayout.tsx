import { ReactElement } from "react";
import { MainLayout } from "components";

function getLayout(page: ReactElement) {
  const { trendingResults, followResults } = page.props;

  return (
    <MainLayout trendingResults={trendingResults} followResults={followResults}>
      {page}
    </MainLayout>
  );
}

export default getLayout;
