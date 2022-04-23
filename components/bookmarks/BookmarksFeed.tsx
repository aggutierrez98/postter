import { DocumentData } from "firebase/firestore";
import { Postwitt, LoadingPostwitts, Header } from "components";
import { UserInterface } from "interfaces";
import { useLoadBookmarked, useNearScreen, useTranslation } from "hooks";

interface Props {
  bookmarks: string[];
  userInfo: UserInterface;
}

export const BookmarksFeed = ({ bookmarks, userInfo }: Props) => {
  const { t } = useTranslation();
  const { postwitts, loading, loadNextPage, hasMore } =
    useLoadBookmarked(bookmarks);

  const { obsRef } = useNearScreen({
    loading,
    loadNextPage,
    hasMore,
  });

  return (
    <div className="border-l border-r border-custom-secondary min-h-full">
      <Header title={t("bookmarks")} tagText={userInfo?.tag} />
      <section className="pb-72">
        {postwitts.length > 0 && (
          <>
            {postwitts.map((postwitt: DocumentData) => {
              return (
                <Postwitt
                  key={postwitt.id}
                  postwittId={postwitt.id}
                  postwitt={postwitt.data()}
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
