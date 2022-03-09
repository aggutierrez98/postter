import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  setDoc,
  DocumentData,
  serverTimestamp,
} from "@firebase/firestore";
import { UserInterface } from "interfaces";
import { Dispatch, SetStateAction } from "react";
import { db } from "../firebase.config";

type Callback = Dispatch<SetStateAction<DocumentData>>;
//   type InputData = { text: string; file: string };

export const watchPostwittLikes = (id: string, callback: Callback) => {
  onSnapshot(collection(db, "postwitts", id, "likes"), (snapshot) =>
    callback(snapshot.docs)
  );
};

export const likePostwitt = async (
  id: string,
  user: UserInterface,
  liked: boolean
) => {
  if (liked) {
    await deleteDoc(doc(db, "postwitts", id, "likes", user.uid));
  } else {
    await setDoc(doc(db, "postwitts", id, "likes", user.uid), {
      userName: user.name,
      userId: user.uid,
      timestamp: serverTimestamp(),
      postwittId: id,
    });
  }
};
