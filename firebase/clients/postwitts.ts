import { Dispatch, SetStateAction } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  deleteDoc,
  where,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  DocumentData,
  getDoc,
  getDocs,
  runTransaction,
  documentId,
  collectionGroup,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { UserInterface } from "interfaces";
import { db, storage } from "../firebase.config";
import { getUser } from "./users";

type Callback = Dispatch<SetStateAction<DocumentData>>;
type InputData = { text: string; file: string; hashtags?: string[] };
const postwittsRef = collection(db, "postwitts");

export const getPostwittIds = async () => {
  const userSnapshots = await getDocs(postwittsRef);
  const postwittsIds = [];

  userSnapshots.forEach((doc) => {
    postwittsIds.push(doc.id);
  });

  return postwittsIds;
};

export const watchPostwitt = (id: string, callback: Callback) => {
  onSnapshot(doc(db, "postwitts", id), (postwittSnapshot) => {
    callback(postwittSnapshot.data());
  });
};

export const watchPostwitts = (callback: Callback) => {
  onSnapshot(query(postwittsRef, orderBy("timestamp", "desc")), (snapshot) => {
    callback(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
};

export const watchPostwittsByUser = (
  userId: string | string[],
  callback: Callback
) => {
  const q = query(
    postwittsRef,
    where("userId", "==", userId),
    orderBy("timestamp", "desc")
  );

  onSnapshot(q, (snapshotPostwitts) => {
    const postwittsByUser = [];
    snapshotPostwitts.forEach((doc) => {
      postwittsByUser.push({ ...doc.data(), id: doc.id });
    });
    callback(postwittsByUser);
  });
};

export const watchPostwittsByUserByLikes = (
  userId: string,
  callback: Callback
) => {
  onSnapshot(
    query(
      collectionGroup(db, "likes"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc")
    ),
    (snapshotLikes) => {
      if (snapshotLikes.docs.length <= 0) {
        callback([]);
        return;
      }

      onSnapshot(
        query(
          collection(db, "postwitts"),
          where(
            documentId(),
            "in",
            snapshotLikes.docs.map((s) => s.data().postwittId)
          )
        ),
        (snapshotLikes) => {
          const newSnaps = snapshotLikes.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          callback(newSnaps);
        }
      );
    }
  );
};

export const watchPostwittReplies = (id: string, callback: Callback) => {
  const q = query(
    postwittsRef,
    where("replied", "==", id),
    orderBy("timestamp", "desc")
  );

  onSnapshot(q, (snapshotReplies) => {
    const replies = [];
    snapshotReplies.forEach((doc) => {
      replies.push(doc);
    });

    callback(replies);
  });
};

export const watchBookmarkedPostwitts = (
  bookmarkedIds: string[],
  callback: Callback
) => {
  const docs = collection(db, "postwitts");

  if (bookmarkedIds?.length > 0) {
    onSnapshot(
      query(
        docs,
        where(documentId(), "in", bookmarkedIds)
        // orderBy("timestamp", "desc")
      ),
      (snapshotPostwitts) => {
        const bookmarkedPostwitts = [];
        snapshotPostwitts.forEach((doc) => {
          bookmarkedPostwitts.push(doc);
        });

        callback(bookmarkedPostwitts);
      }
    );
  } else callback([]);
};

export const newPostwitt = async (
  user: UserInterface,
  data: InputData,
  replied?: string
) => {
  let { text, file, hashtags } = data;
  if (!replied) replied = null;
  if (!hashtags) hashtags = [];

  const docRef = await addDoc(postwittsRef, {
    userId: user.uid,
    userName: user.name,
    userImg: user.image,
    tag: user.tag,
    text,
    replied,
    timestamp: serverTimestamp(),
    hashtags,
  });

  if (file) {
    const imageRef = ref(storage, `postwitts/${docRef.id}/image`);

    await uploadString(imageRef, file, "data_url").then(async () => {
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "postwitts", docRef.id), {
        image: downloadURL,
      });
    });
  }
};

export const deletePostwitt = async (id: string) => {
  deleteDoc(doc(db, "postwitts", id));
};

export const fetchPostwitt = async (id: any) => {
  const postwittSnap = await getDoc(doc(db, "postwitts", id));
  if (postwittSnap.exists()) {
    return postwittSnap.data();
  }

  return null;
};

export const bookmartPostwitt = async (idPostwitt: string, idUser: string) => {
  try {
    const userDoc = await getUser(idUser);
    const userRef = doc(db, "users", userDoc.id);

    // Defines the actual user following data adding the followingId
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) throw new Error("Document does not exist!");

      const oldData = userDoc.data();
      const newBookmarks = oldData.bookmarks ? oldData.bookmarks : [];
      newBookmarks.push(idPostwitt);

      const newData = {
        ...oldData,
        bookmarks: newBookmarks,
      };

      transaction.update(userRef, newData);
    });

    return true;
  } catch (e) {
    console.log("Transaction failed: ", e);
    throw new Error(e);
  }
};

export const unBookmartPostwitt = async (
  idPostwitt: string,
  idUser: string
) => {
  try {
    const userDoc = await getUser(idUser);
    const userRef = doc(db, "users", userDoc.id);

    // Defines the actual user following data adding the followingId
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) throw new Error("Document does not exist!");

      const oldData = userDoc.data();

      const newBookmarks = oldData.bookmarks.filter(
        (b: string) => b !== idPostwitt
      );

      const newData = {
        ...oldData,
        bookmarks: newBookmarks,
      };

      transaction.update(userRef, newData);
    });

    return true;
  } catch (e) {
    console.log("Transaction failed: ", e);
    throw new Error(e);
  }
};
