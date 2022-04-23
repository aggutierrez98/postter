import { Postwitt, LoadingPostwitts } from "components";
import { DocumentData } from "firebase/firestore";
import { useNearScreen } from "hooks";
import { useLoadPostwittsReplies } from "hooks";

export const RepliesList = ({ postId }) => {
  const { replies, loading, loadNextPage, hasMore } = useLoadPostwittsReplies({
    postId,
  });

  const { obsRef } = useNearScreen({
    loading,
    loadNextPage,
    hasMore,
  });

  return (
    <>
      <section className="pb-72">
        {replies.length > 0 && (
          <>
            {replies.map((reply: DocumentData) => {
              return (
                <Postwitt
                  key={reply.id}
                  postwittId={reply.id}
                  postwitt={reply.data()}
                />
              );
            })}
            <div id="visor" ref={obsRef}></div>
          </>
        )}
        {loading && <LoadingPostwitts />}
      </section>
    </>
  );
};
