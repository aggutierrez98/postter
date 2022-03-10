import {
  collection,
  onSnapshot,
  getDocs,
  where,
  query,
} from "@firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { db } from "../firebase.config";

type Callback = Dispatch<
  SetStateAction<{ hashtag: string; postwitts: number }[]>
>;

export const watchHastags = (callback: Callback) => {
  let hastagsFromDocs = [];
  onSnapshot(
    query(collection(db, "postwitts"), where("hashtags", "!=", false)),
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

export const watchHastagsPostwitts = (hashtag: string, callback) => {
  onSnapshot(
    query(
      collection(db, "postwitts"),
      where("hashtags", "array-contains", hashtag)
    ),
    (snapshot) => {
      callback(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    }
  );
};

export const getHashtags = async () => {
  console.log("HELLOUUU");

  const hastagDocs = await getDocs(
    query(collection(db, "postwitts"), where("hashtags", "!=", false))
  );

  if (hastagDocs.docs.length <= 0) return [];

  let hastagsFromDocs = [];
  hastagDocs.forEach((doc) => {
    hastagsFromDocs.push(...doc.data().hashtags);
  });

  hastagsFromDocs = hastagsFromDocs.filter(
    (ele, pos) => hastagsFromDocs.indexOf(ele) === pos
  );

  const postwittFromHastagsDocs = await getDocs(
    query(
      collection(db, "postwitts"),
      where("hashtags", "array-contains-any", hastagsFromDocs || [])
    )
  );

  const postwittFromHashtags = postwittFromHastagsDocs.docs.map(
    (doc) => doc.data().hashtags
  );
  let hashsWithPostwittsCount: {
    hashtag: string;
    postwitts: number;
  }[] = hastagsFromDocs.map((hash) => {
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
