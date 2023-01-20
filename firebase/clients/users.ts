import { Dispatch, SetStateAction } from "react";
import {
  addDoc,
  collection,
  doc,
  where,
  query,
  deleteDoc,
  onSnapshot,
  DocumentData,
  getDocs,
  runTransaction,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { UserInterface } from "interfaces";
import { db, storage } from "../firebase.config";

type Callback = Dispatch<SetStateAction<DocumentData>>;
const usersRef = collection(db, "users");

export const getUserByEmail = async (email: string) => {
  const q = query(usersRef, where("email", "==", email));
  const userSnap = await getDocs(q);

  let docData: DocumentData;
  userSnap.forEach((doc) => {
    docData = doc.data();
  });

  return docData;
};

export const userExists = async (uid: string) => {
  const userData = await getUser(uid);
  if (userData) return true;
  else return false;
};

export const getUser = async (id: string | string[]) => {
  const q = query(usersRef, where("uid", "==", id));
  const userSnap = await getDocs(q);

  let docData: DocumentData;
  userSnap.forEach((doc) => {
    docData = doc;
  });

  return docData;
};

export const getUsersIds = async () => {
  const userSnapshots = await getDocs(usersRef);
  const userIds = [];

  userSnapshots.forEach((doc) => {
    userIds.push(doc.data().uid);
  });

  return userIds;
};

export const watchUser = (id: string, callback: Callback) => {
  const q = query(usersRef, where("uid", "==", id));

  onSnapshot(q, (userSnapshot) => {
    userSnapshot.forEach((userDoc) => {
      callback(userDoc.data());
    });
  });
};

export const newUser = async (user: UserInterface) => {
  const { uid, name, email, tag, image } = user;

  await addDoc(usersRef, {
    uid,
    name,
    email,
    tag,
    image,
  });
};

export const editUser = async (id: string, data: UserInterface) => {
  let {
    bannerImg = null,
    biography = null,
    location = null,
    birthday = null,
    image = null,
    // // bookmarts,
    // // pinned,
    // // following,
    // // followers,
  } = data;

  try {
    const userDoc = await getUser(id);
    const docRef = doc(db, "users", userDoc.id);

    if (!image.includes("https://lh3.googleusercontent.com/")) {
      const imageRef = ref(storage, `users/${docRef.id}/profile`);

      await uploadString(imageRef, image, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        image = downloadURL;
      });
    }

    if (
      bannerImg &&
      !bannerImg.includes("https://firebasestorage.googleapis.com/")
    ) {
      const imageRef = ref(storage, `users/${docRef.id}/banner`);

      await uploadString(imageRef, bannerImg, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        bannerImg = downloadURL;
      });
    }

    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(docRef);
      if (!userDoc.exists()) throw new Error("Document does not exist!");

      const oldData = userDoc.data();

      const newData = {
        ...oldData,
        image,
        bannerImg,
        biography,
        location,
        birthday,
      };

      transaction.update(docRef, newData);
    });
  } catch (e) {
    console.log("Transaction failed: ", e);
    throw new Error(e);
  }
};

export const deleteUser = (id: string) => {
  deleteDoc(doc(db, "users", id));
};

export const userPinupPostwitt = async (postwittId: string, userId: string) => {
  try {
    const userDoc = await getUser(userId);
    const docRef = doc(db, "users", userDoc.id);

    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(docRef);
      if (!userDoc.exists()) throw new Error("Document does not exist!");

      const oldData = userDoc.data();

      const newData = {
        ...oldData,
        pinned: postwittId,
      };

      transaction.update(docRef, newData);
    });
  } catch (e) {
    console.log("Transaction failed: ", e);
    throw new Error(e);
  }
};

export const userPinoffPostwitt = async (userId: string) => {
  try {
    const userDoc = await getUser(userId);
    const docRef = doc(db, "users", userDoc.id);

    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(docRef);
      if (!userDoc.exists()) throw new Error("Document does not exist!");

      const oldData = userDoc.data();

      const newData = {
        ...oldData,
        pinned: null,
      };

      transaction.update(docRef, newData);
    });
  } catch (e) {
    console.log("Transaction failed: ", e);
    throw new Error(e);
  }
};

export const followUser = async (followerId: string, followingId: string) => {
  try {
    const followerDoc = await getUser(followerId);
    const followerRef = doc(db, "users", followerDoc.id);
    const followingDoc = await getUser(followingId);
    const followingRef = doc(db, "users", followingDoc.id);

    // Defines the actual user following data adding the followingId
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(followerRef);
      if (!userDoc.exists()) throw new Error("Document does not exist!");

      const oldData = userDoc.data();

      const newData = {
        ...oldData,
        following: oldData.following
          ? [...oldData.following, followingId]
          : [followingId],
      };

      transaction.update(followerRef, newData);
    });

    // Defines the following user followers data adding the followerId
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(followingRef);
      if (!userDoc.exists()) throw new Error("Document does not exist!");

      const oldData = userDoc.data();

      const newData = {
        ...oldData,
        followers: oldData.followers
          ? [...oldData.followers, followerId]
          : [followerId],
      };

      transaction.update(followingRef, newData);
    });
  } catch (e) {
    console.log("Transaction failed: ", e);
    throw new Error(e);
  }
};

export const unfollowUser = async (followerId: string, followingId: string) => {
  try {
    const followerDoc = await getUser(followerId);
    const followerRef = doc(db, "users", followerDoc.id);
    const followingDoc = await getUser(followingId);
    const followingRef = doc(db, "users", followingDoc.id);

    // Defines the actual user following data filtering the followingId
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(followerRef);
      if (!userDoc.exists()) throw new Error("Document does not exist!");

      const oldData = userDoc.data();
      const newFollowing = oldData.following.filter(
        (u: string) => u !== followingId
      );

      const newData = {
        ...oldData,
        following: newFollowing,
      };

      transaction.update(followerRef, newData);
    });

    // Defines the following user followers data filtering the followerId
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(followingRef);
      if (!userDoc.exists()) throw new Error("Document does not exist!");

      const oldData = userDoc.data();
      const newFollowers = oldData.followers.filter(
        (u: string) => u !== followerId
      );

      const newData = {
        ...oldData,
        followers: newFollowers,
      };

      transaction.update(followingRef, newData);
    });
  } catch (e) {
    console.log("Transaction failed: ", e);
    throw new Error(e);
  }
};
