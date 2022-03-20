import { editUser } from "@f/index";
import { ChangeEvent, useContext, useRef } from "react";
import { useForm } from "hooks";
import { UserContext } from "context";

export const useEditUser = () => {
  const { setIsOpen, userId, setLoadingChanges } = useContext(UserContext);
  const profileImagePickerRef = useRef(null);
  const bannerImagePickerRef = useRef(null);

  const {
    values: userValues,
    handleInputChange: handleUserInfoChange,
    reset: setUserValues,
  }: {
    values: any;
    handleInputChange: ({ target }: { target: HTMLInputElement }) => void;
    reset: (newFormState: any) => void;
  } = useForm({
    tag: null,
    name: null,
    birthday: null,
    biography: null,
    uid: null,
    image: null,
    email: null,
    location: null,
    bannerImg: null,
  });

  const dateFrom18Years = ((d) => new Date(d.setDate(d.getDay() - 6570)))(
    new Date()
  )
    .toISOString()
    .split("T")[0];

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoadingChanges(true);
    await editUser(userId, userValues);
    setLoadingChanges(false);
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
  };
};
