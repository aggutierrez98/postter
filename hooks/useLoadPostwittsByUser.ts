import { watchPostwittsByUser, watchPostwittsByUserByReposts } from "@firebase";
import { useEffect, useState } from "react";
import { moveToStart } from "helpers";
import { usePaginatedLogic } from "./usePaginetedLogic";

export const useLoadPostwittsByUser = ({ userData, option }) => {
  const [totalPostwitts, setTotalPostwitts] = useState([]);
  const [reposts, setReposts] = useState([]);
  const [postwitts, setPostwitts] = useState([]);

  const { hasMore, loading, setLoading, pageNumber, loadNextPage } =
    usePaginatedLogic(totalPostwitts.length);

  useEffect(() => {
    watchPostwittsByUser(
      userData.uid,
      setTotalPostwitts,
      setLoading,
      pageNumber,
      option
    );
    watchPostwittsByUserByReposts(userData.uid, setReposts);
    return () => {
      watchPostwittsByUser(
        userData.uid,
        setTotalPostwitts,
        setLoading,
        pageNumber,
        option
      );
      watchPostwittsByUserByReposts(userData.uid, setReposts);
    };
  }, [userData.uid, pageNumber, option, setLoading]);

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
  }, [option, totalPostwitts, reposts, userData]);

  return { postwitts, loadNextPage, loading, hasMore };
};
