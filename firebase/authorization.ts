import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const loginRegister = async (
  email: string,
  password: string,
  name?: string
) => {
  const auth = getAuth();

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
