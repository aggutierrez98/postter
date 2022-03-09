import { editUser } from "../firebase/clients/users";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { useForm } from "./useForm";
import { UserContext, UserContextProps } from "context/users/UserContext";

export const useEditUser = () => {
  const { setIsOpen, userId } = useContext<UserContextProps>(UserContext);
  const [userChangeLoading, setUserChangeLoading] = useState(false);
  const profileImagePickerRef = useRef(null);
  const bannerImagePickerRef = useRef(null);

  const {
    values: userValues,
    handleInputChange: handleUserInfoChange,
    reset: setUserValues,
  }: {
    values: any;
    // eslint-disable-next-line no-unused-vars
    handleInputChange: ({ target }: { target: HTMLInputElement }) => void;
    // eslint-disable-next-line no-unused-vars
    reset: (newFormState: any) => void;
  } = useForm();

  const dateFrom18Years = ((d) => new Date(d.setDate(d.getDay() - 6570)))(
    new Date()
  )
    .toISOString()
    .split("T")[0];

  const onSubmit = async (e) => {
    e.preventDefault();
    setUserChangeLoading(true);
    await editUser(userId, userValues);
    setUserChangeLoading(false);
    setIsOpen(false);
  };

  const deleteBannerImg = () => {
    setUserValues((prevState) => ({
      ...prevState,
      bannerImg: null,
    }));
  };

  const editBannerImg = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (ev: ProgressEvent<FileReader>) => {
      setUserValues((prevState) => ({
        ...prevState,
        bannerImg: ev.target.result.toString(),
      }));
    };
  };

  const editProfileImg = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (ev: ProgressEvent<FileReader>) => {
      setUserValues((prevState) => ({
        ...prevState,
        image: ev.target.result.toString(),
      }));
    };
  };

  return {
    profileImagePickerRef,
    bannerImagePickerRef,
    userValues,
    setUserValues,
    handleUserInfoChange,
    dateFrom18Years,
    onSubmit,
    deleteBannerImg,
    editBannerImg,
    editProfileImg,
    userChangeLoading,
    setUserChangeLoading,
  };
};
