import { useSession } from "next-auth/react";
import { PostwittInterface } from "interfaces";
import { NewPostwitt, Postwitt, LoadingPostwitts, Header } from "components";
import { useLoadPostwitts, useNearScreen, useTranslation } from "hooks";

export const Feed = () => {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const { postwitts, loading, loadNextPage, hasMore } = useLoadPostwitts();
  const { obsRef } = useNearScreen({
    loading,
    loadNextPage,
    hasMore,
  });

  return (
    <div className="border-l border-r border-custom-secondary min-h-full">
      <Header title={t("home")} isHome />
      <section className="hidden phone:flex">
        {session && <NewPostwitt />}
      </section>
      <section className="pb-72 border-t border-custom-secondary relative">
        {postwitts.length > 0 && (
          <>
            {postwitts.map((postwitt: PostwittInterface) => {
              return (
                <Postwitt
                  key={postwitt.id}
                  postwittId={postwitt.id}
                  postwitt={postwitt}
                  repostedBy={postwitt.repostedBy}
                  idOriginal={postwitt.idOriginal}
                  timePostedOriginal={postwitt.timePostedOriginal}
                />
              );
            })}
            <div id="visor" ref={obsRef}></div>
          </>
        )}
        {loading && <LoadingPostwitts />}
      </section>
    </div>
  );
};
