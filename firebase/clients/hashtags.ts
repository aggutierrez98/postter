import { Dispatch, SetStateAction } from "react";
import {
  collection,
  onSnapshot,
  getDocs,
  where,
  query,
  limit,
  DocumentData,
  QuerySnapshot,
} from "@firebase/firestore";
import { db } from "../firebase.config";

type Callback = Dispatch<SetStateAction<DocumentData>>;
type CallbackLoading = Dispatch<SetStateAction<Boolean>>;

const LIMIT_CHARGE_POSTWITTS = 6;

export const watchHastags = (callback: Callback) => {
  let hastagsFromDocs = [];

  onSnapshot(
    query(collection(db, "postwitts"), where("hashtags", "!=", null)),
    (hashtagSnapshots) => {
      if (hashtagSnapshots.docs.length <= 0) {
        callback([]);
        return;
      }

      hashtagSnapshots.forEach((doc) => {
        hastagsFromDocs.push(...doc.data().hashtags);
      });

      hastagsFromDocs = [...hastagsFromDocs].filter(
        (ele, pos) => [...hastagsFromDocs].indexOf(ele) === pos
      );

      if (hastagsFromDocs.length <= 0) {
        callback([]);
        return;
      }

      onSnapshot(
        query(
          collection(db, "postwitts"),
          where("hashtags", "array-contains-any", hastagsFromDocs)
        ),
        (postwittFromHastagsDocs) => {
          const postwittFromHashtags = postwittFromHastagsDocs.docs.map(
            (doc) => doc.data().hashtags
          );
          let hashsWithPostwittsCount = hastagsFromDocs.map((hash) => {
            let postwitts = 0;
            postwittFromHashtags.forEach((hashsFromPost) => {
              if (hashsFromPost.includes(hash)) postwitts++;
            });

            return {
              hashtag: hash,
              postwitts,
            };
          });

          hashsWithPostwittsCount = hashsWithPostwittsCount.sort(
            (a, b) => b.postwitts - a.postwitts
          );

          callback(hashsWithPostwittsCount);
        }
      );
    }
  );
};

export const getHashtagsByName = async (name: string) => {
  let hashtagsFromDocs = [];

  if (name.length <= 0) return [];

  const hashs = await getDocs(
    query(collection(db, "postwitts"), where("hashtags", "!=", null))
  );

  if (hashs.docs.length <= 0) return [];

  hashs.forEach((doc) => {
    hashtagsFromDocs.push(...doc.data().hashtags);
  });

  hashtagsFromDocs = [...hashtagsFromDocs].filter(
    (ele, pos) => [...hashtagsFromDocs].indexOf(ele) === pos
  );

  hashtagsFromDocs = hashtagsFromDocs.filter((hashtag) =>
    hashtag.toLowerCase().includes(name)
  );

  if (hashtagsFromDocs.length <= 0) return [];

  const hashsFinal = await getDocs(
    query(
      collection(db, "postwitts"),
      where("hashtags", "array-contains-any", hashtagsFromDocs)
    )
  );

  const postwittFromHashtags = hashsFinal.docs.map(
    (doc) => doc.data().hashtags
  );
  let hashsWithPostwittsCount = hashtagsFromDocs.map((hash) => {
    let postwitts = 0;
    postwittFromHashtags.forEach((hashsFromPost) => {
      if (hashsFromPost.includes(hash)) postwitts++;
    });

    return {
      hashtag: hash,
      postwitts,
    };
  });

  hashsWithPostwittsCount = hashsWithPostwittsCount.sort(
    (a, b) => b.postwitts - a.postwitts
  );

  return hashsWithPostwittsCount;
};

export const watchHastagsPostwitts = (
  hashtag: string,
  callback: Callback,
  setLoading: CallbackLoading,
  pageNumber = 1
) => {
  const limitNumber = pageNumber * LIMIT_CHARGE_POSTWITTS;

  onSnapshot(
    query(
      collection(db, "postwitts"),
      where("hashtags", "array-contains", hashtag),
      limit(limitNumber)
    ),
    (snapshot) => {
      callback(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoading(false);
    }
  );
};

export const getHashtags = async () => {
  const hastagDocs = await getDocs(
    query(collection(db, "postwitts"), where("hashtags", "!=", false))
  );

  if (hastagDocs.docs.length <= 0) return [];

  let hashtagsFromDocs = [];
  hastagDocs.forEach((doc) => {
    hashtagsFromDocs.push(...doc.data().hashtags);
  });

  hashtagsFromDocs = hashtagsFromDocs.filter(
    (ele, pos) => hashtagsFromDocs.indexOf(ele) === pos
  );

  let postwittFromHashtags = [];
  if (hashtagsFromDocs.length > 0) {
    const postwittFromHastagsDocs = await getDocs(
      query(
        collection(db, "postwitts"),
        where("hashtags", "array-contains-any", hashtagsFromDocs)
      )
    );
    postwittFromHashtags = postwittFromHastagsDocs.docs.map(
      (doc) => doc.data().hashtags
    );
  }

  let hashsWithPostwittsCount: {
    hashtag: string;
    postwitts: number;
  }[] = hashtagsFromDocs.map((hash) => {
    let count = 0;
    postwittFromHashtags.forEach((hashsFromPost) => {
      if (hashsFromPost.includes(hash)) count++;
    });

    return {
      hashtag: hash,
      postwitts: count,
    };
  });

  hashsWithPostwittsCount = hashsWithPostwittsCount.sort(
    (a, b) => b.postwitts - a.postwitts
  );

  return hashsWithPostwittsCount;
};
