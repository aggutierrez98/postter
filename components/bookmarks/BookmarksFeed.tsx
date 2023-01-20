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
      {loading ? (
        <LoadingPostwitts />
      ) : postwitts.length > 0 ? (
        <section className="pb-72">
          {postwitts.map((postwitt: DocumentData) => (
            <Postwitt
              key={postwitt.id}
              postwittId={postwitt.id}
              postwitt={postwitt.data()}
            />
          ))}
          <div id="visor" ref={obsRef}></div>
        </section>
      ) : (
        <section className="flex items-center justify-center flex-col h-[150px] w-full ">
          <h2 className="text-xl bg-custom-alternative px-8 py-4 text-custom-primary rounded-[10px]">
            {t("no_bookmarks_saved")}
          </h2>
        </section>
      )}
    </div>
  );
};
