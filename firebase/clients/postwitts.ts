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
  limit,
  DocumentReference,
  Query,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { UserInterface } from "interfaces";
import { db, storage } from "../firebase.config";
import { getUser } from "./users";

type Callback = Dispatch<SetStateAction<DocumentData>>;
type CallbackLoading = Dispatch<SetStateAction<Boolean>>;
type InputData = { text: string; file: string; hashtags?: string[] };
const postwittsRef = collection(db, "postwitts");

const LIMIT_CHARGE_POSTWITTS = 6;

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

export const watchPostwitts = async (
  callback: Callback,
  setLoading: CallbackLoading,
  pageNumber = 1
) => {
  const limitNumber = pageNumber * LIMIT_CHARGE_POSTWITTS;

  onSnapshot(
    query(postwittsRef, orderBy("timestamp", "desc"), limit(limitNumber)),
    (snapshot) => {
      callback(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    }
  );
};

export const watchPostwittsByUser = (
  userId: string | string[],
  callback: Callback,
  setLoading: Dispatch<SetStateAction<boolean>>,
  pageNumber: number = 1,
  option: number = 0
) => {
  const limitNumber = pageNumber * LIMIT_CHARGE_POSTWITTS;

  if (option === 0 || option === 2) {
    const q = query(
      postwittsRef,
      where("userId", "==", userId),
      where("replied", "==", null),
      orderBy("timestamp", "desc"),
      limit(limitNumber)
    );

    onSnapshot(q, (snapshotPostwitts) => {
      const postwittsByUser = [];
      snapshotPostwitts.forEach((doc) => {
        postwittsByUser.push({ ...doc.data(), id: doc.id });
      });
      callback(postwittsByUser);
      setLoading(false);
    });
  } else if (option === 1) {
    const q = query(
      postwittsRef,
      where("userId", "==", userId),
      orderBy("timestamp", "desc"),
      limit(limitNumber)
    );

    onSnapshot(q, (snapshotPostwitts) => {
      const postwittsByUser = [];
      snapshotPostwitts.forEach((doc) => {
        postwittsByUser.push({ ...doc.data(), id: doc.id });
      });
      callback(postwittsByUser);
      setLoading(false);
    });
  } else if (option === 3) {
    onSnapshot(
      query(
        collectionGroup(db, "likes"),
        where("userId", "==", userId),
        orderBy("timestamp", "desc"),
        limit(limitNumber)
      ),
      (snapshotLikes) => {
        if (snapshotLikes.docs.length <= 0) {
          callback([]);
          setLoading(false);
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
            setLoading(false);
          }
        );
      }
    );
  }
};

export const watchPostwittReplies = (
  id: string,
  callback: Callback,
  setLoading?: CallbackLoading,
  pageNumber?: number
) => {
  let limitNumber: number;
  let q: Query<DocumentData> | DocumentReference<any>;

  if (pageNumber) {
    limitNumber = pageNumber * LIMIT_CHARGE_POSTWITTS;
    q = query(
      postwittsRef,
      where("replied", "==", id),
      orderBy("timestamp", "desc"),
      limit(limitNumber)
    );
  }

  q = query(
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
    if (setLoading) setLoading(false);
  });
};

export const watchBookmarkedPostwitts = (
  bookmarkedIds: string[],
  callback: Callback,
  setLoading: CallbackLoading,
  pageNumber: number = 1
) => {
  const limitNumber = pageNumber * LIMIT_CHARGE_POSTWITTS;

  const docs = collection(db, "postwitts");

  if (bookmarkedIds?.length > 0) {
    onSnapshot(
      query(
        docs,
        where(documentId(), "in", bookmarkedIds),
        limit(limitNumber)

        // orderBy("timestamp", "desc")
      ),
      (snapshotPostwitts) => {
        const bookmarkedPostwitts = [];
        snapshotPostwitts.forEach((doc) => {
          bookmarkedPostwitts.push(doc);
        });

        callback(bookmarkedPostwitts);
        setLoading(false);
      }
    );
  } else {
    callback([]);
    setLoading(false);
  }
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
