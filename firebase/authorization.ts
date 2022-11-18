import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@firebase";

export const loginRegister = async (
  email: string,
  password: string,
  name?: string
) => {
  if (name) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: name });

      return {
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
        uid: user.uid,
      };
    } catch (error) {
      throw new Error(error.code);
    }
  } else {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      return {
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
        uid: user.uid,
      };
    } catch (error) {
      return null;
    }
  }
};
