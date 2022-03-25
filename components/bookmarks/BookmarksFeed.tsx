import { DocumentData } from "firebase/firestore";
import { Postwitt, LoadingPostwitts } from "components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { UserInterface } from "interfaces";
import { useLoadBookmarked, useNearScreen, useTranslation } from "hooks";

interface Props {
  bookmarks: string[];
  userInfo: UserInterface;
}

export const BookmarksFeed = ({ bookmarks, userInfo }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { postwitts, loading, loadNextPage, hasMore } =
    useLoadBookmarked(bookmarks);

  const { obsRef } = useNearScreen({
    loading,
    loadNextPage,
    hasMore,
  });

  return (
    <div className="border-l border-r border-custom-secondary min-h-full">
      <div
        className="flex items-center px-1.5 py-2 border-b border-custom-secondary text-custom-text font-semibold 
            text-xl gap-x-4 top-0 z-50 bg-custom-primary"
      >
        <div
          className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
          onClick={() => {
            router.back();
            router.push("/");
          }}
        >
          <ArrowBackIcon className="h-5 text-custom-text" />
        </div>
        <div className="flex flex-col mb-1">
          {t("bookmarks")}
          <span className="text-custom-placeholder text-sm leading-[8px]">
            @{userInfo?.tag}
          </span>
        </div>
      </div>
      <div className="pb-72">
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
      </div>
    </div>
  );
};
