import { watchPostwittsByUser, watchPostwittsByUserByReposts } from "@firebase";
import { useEffect, useState } from "react";
import { moveToStart } from "helpers";
import { usePaginatedLogic } from "hooks";

const LOAD_OPTIONS = ["postwitts", "postwitts and answers", "media", "likes"];

export const useLoadPostwittsByUser = ({ userData, option }) => {
  const [totalPostwitts, setTotalPostwitts] = useState([]);
  const [reposts, setReposts] = useState([]);
  const [postwitts, setPostwitts] = useState([]);

  const { hasMore, loading, setLoading, pageNumber, loadNextPage } =
    usePaginatedLogic(totalPostwitts.length, option);

  useEffect(() => {
    watchPostwittsByUser(
      userData.uid,
      setTotalPostwitts,
      setLoading,
      pageNumber,
      option
    );
  }, [userData.uid, option, pageNumber, setLoading]);

  useEffect(() => {
    watchPostwittsByUserByReposts(userData.uid, setLoading, setReposts);
  }, [userData.uid, setLoading]);

  useEffect(() => {
    if (totalPostwitts.length === 0) return;

    if (option === 0 || option === 1) {
      setPostwitts(() => {
        //joining and ordering posts with reposts
        let newPostwitts = [...totalPostwitts, ...reposts].sort(
          (a, b) => b.timestamp - a.timestamp
        );

        //Moving pinned to front
        newPostwitts = moveToStart(
          newPostwitts,
          ({ id }) => id === userData.pinned
        );

        return newPostwitts;
      });
    } else if (option === 2)
      setPostwitts(totalPostwitts.filter((postwitt) => postwitt.image));
    else {
      setPostwitts(totalPostwitts);
    }

    return () => {
      setPostwitts([]);
    };
  }, [option, totalPostwitts, reposts, userData, setLoading]);

  return { postwitts, loadNextPage, loading, hasMore, options: LOAD_OPTIONS };
};
