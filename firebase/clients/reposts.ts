import { Dispatch, SetStateAction } from "react";
import {
  doc,
  deleteDoc,
  onSnapshot,
  setDoc,
  DocumentData,
  serverTimestamp,
  query,
  orderBy,
  where,
  collectionGroup,
  collection,
  documentId,
} from "@firebase/firestore";
import { db } from "../firebase.config";
import { UserInterface } from "interfaces";

type Callback = Dispatch<SetStateAction<DocumentData>>;
//   type InputData = { text: string; file: string };

const LIMIT_CHARGE_POSTWITTS = 6;

export const watchPostwittReposts = (id: string, callback: Callback) => {
  onSnapshot(collection(db, "postwitts", id, "reposts"), (snapshot) =>
    callback(snapshot.docs)
  );
};

export const repostPostwitt = async (
  id: string,
  user: UserInterface,
  reposted: boolean
) => {
  if (reposted) {
    await deleteDoc(doc(db, "postwitts", id, "reposts", user.uid));
  } else {
    await setDoc(doc(db, "postwitts", id, "reposts", user.uid), {
      userId: user.uid,
      userName: user.name,
      timestamp: serverTimestamp(),
      idPostwitt: id,
    });
  }
};

export const watchReposts = (callback: Callback) => {
  onSnapshot(query(collectionGroup(db, "reposts")), (snapshotReposts) => {
    if (snapshotReposts.docs.length <= 0) {
      callback([]);
      return;
    }

    onSnapshot(
      query(
        collection(db, "postwitts"),
        where(
          documentId(),
          "in",
          snapshotReposts.docs.map((s) => s.data().idPostwitt)
        )
      ),
      (snapshotPostwitts) => {
        const newSnaps = snapshotPostwitts.docs.map((doc, index) => {
          return {
            ...doc.data(),
            id: doc.data().userId,
            timestamp: snapshotReposts.docs[index].data().timestamp,
            repostedBy: snapshotReposts.docs[index].data().userName,
            timePostedOriginal: doc.data().timestamp,
            idOriginal: doc.id,
          };
        });
        callback(newSnaps);
      }
    );
  });
};

export const watchPostwittsByUserByReposts = async (
  userId: string,
  callback: Callback
  // pageNumber = 1
) => {
  // const limitNumber = pageNumber * LIMIT_CHARGE_POSTWITTS;

  onSnapshot(
    query(
      collectionGroup(db, "reposts"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc")
    ),
    (snapshotReposts) => {
      if (snapshotReposts.docs.length <= 0) {
        callback([]);
        return;
      }

      onSnapshot(
        query(
          collection(db, "postwitts"),
          where(
            documentId(),
            "in",
            snapshotReposts.docs.map((s) => s.data().idPostwitt)
          )
        ),
        (snapshotLikes) => {
          const newSnaps = snapshotLikes.docs.map((doc, index) => {
            return {
              ...doc.data(),
              id: doc.data().userId,
              timestamp: snapshotReposts.docs[index].data().timestamp,
              repostedBy: snapshotReposts.docs[index].data().userName,
              timePostedOriginal: doc.data().timestamp,
              idOriginal: doc.id,
            };
          });
          callback(newSnaps);
        }
      );
    }
  );
};
