import { Dialog, Transition } from "@headlessui/react";
import { useContext, useEffect } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LocalSeeOutlinedIcon from "@mui/icons-material/LocalSeeOutlined";
import { UserContext, UserContextProps } from "../context/users/UserContext";
import Image from "next/image";
import defaultImage from "public/banner.jpg";
import { InputCustom } from "./InputCustom";
import { useEditUser } from "@h/useEditUser";
import { watchUser } from "../firebase/clients/users";
import { db } from "../firebase/firebase.config";

export const ModalEditUser = () => {
  const { modalIsOpen, setIsOpen, userId } =
    useContext<UserContextProps>(UserContext);

  const {
    userValues,
    setUserValues,
    handleUserInfoChange,
    onSubmit,
    bannerImagePickerRef,
    profileImagePickerRef,
    dateFrom18Years,
    deleteBannerImg,
    editBannerImg,
    editProfileImg,
    userChangeLoading,
    // setUserChangeLoading,
  } = useEditUser();

  useEffect(() => {
    watchUser(userId, setUserValues);
    return () => {
      watchUser(userId, setUserValues);
    };
  }, [userId, setUserValues]);

  return (
    <Transition
      show={modalIsOpen}
      enter="transition-opacity"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog
        as="div"
        className="fixed z-50 inset-0 phone:pt-8"
        onClose={() => setIsOpen(false)}
      >
        <div
          className="flex items-start justify-center min-h-[800px] sm:min-h-screen phone:pt-4 phone:px-4 pb-20
          text-center sm:block sm:p-0 max-h-[90vh] "
        >
          <Dialog.Overlay className="fixed inset-0 bg-primary phone:bg-[#5b7083] phone:bg-opacity-40 transition-opacity">
            {userChangeLoading && (
              <img
                className="absolute left-[60px] bottom-[60px] animate-spin  loading__image w-[80px]"
                src={"/loading.png"}
                alt="loading-image"
              />
            )}
          </Dialog.Overlay>
          <form
            onSubmit={onSubmit}
            className="inline-block align-bottom bg-primary rounded-2xl text-left phone:shadow-xl 
                transform transition-all sm:my-8 sm:align-middle sm:max-w-[600px] sm:w-full h-screen phone:h-auto"
          >
            <div className="flex items-center justify-between px-1.5 py-2 border-b border-secondary">
              <div
                className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                onClick={() => setIsOpen(false)}
              >
                <CloseOutlinedIcon className="h-[22px] text-white" />
              </div>
              <div className="text-text font-bold ml-8 text-lg flex-grow">
                Edit Profile
              </div>
              <button className="rounded-3xl border-text border px-3 mr-2 bg-text text-primary font-bold ml-5 text-lg">
                Save
              </button>
            </div>

            <div className="flex pt-5 pb-2.5 justify-center flex-col items-center relative">
              <div className="flex justify-center items-center">
                <div
                  title="Add Image"
                  className="cursor-pointer mr-16 z-[1] rounded-full absolute w-[50px] h-[50px] bg-primary bg-opacity-80 flex items-center 
                  justify-center text-text hover:bg-opacity-60"
                  onClick={() => bannerImagePickerRef.current.click()}
                >
                  <input
                    type="file"
                    ref={bannerImagePickerRef}
                    hidden
                    onChange={editBannerImg}
                    accept="image/png,image/jpeg,image/jpg"
                  />
                  <LocalSeeOutlinedIcon />
                </div>
                <div
                  title="Delete Image"
                  onClick={deleteBannerImg}
                  className="cursor-pointer ml-16 z-[1] rounded-full absolute w-[50px] h-[50px] bg-primary bg-opacity-80 flex items-center 
                  justify-center text-text hover:bg-opacity-60"
                >
                  <CloseOutlinedIcon />
                </div>
                <Image
                  className="object-cover object-center border-secondary border-2"
                  width={581}
                  height={193.66}
                  src={
                    userValues?.bannerImg ? userValues?.bannerImg : defaultImage
                  }
                />
              </div>
              <div
                className="self-start ml-5 bottom-[50px] h-[122px] w-[122px] relative bg-primary rounded-full flex 
                    items-center justify-center"
              >
                <div
                  title="Change Profile Image"
                  className="cursor-pointer z-[1] rounded-full absolute w-[50px] h-[50px] bg-primary bg-opacity-80 flex items-center 
                  justify-center text-text  hover:bg-opacity-60"
                  onClick={() => profileImagePickerRef.current.click()}
                >
                  <input
                    type="file"
                    ref={profileImagePickerRef}
                    hidden
                    onChange={editProfileImg}
                    accept="image/png,image/jpeg,image/jpg"
                  />
                  <LocalSeeOutlinedIcon />
                </div>
                <Image
                  className="object-cover object-center rounded-full absolute"
                  width={112}
                  height={112}
                  src={userValues?.image ? userValues?.image : defaultImage}
                />
              </div>
              <div className="flex flex-col w-full px-5 mt-[-30px]">
                <InputCustom
                  autoComplete="off"
                  name="name"
                  onChange={handleUserInfoChange}
                  defaultValue={userValues?.name}
                  charsLimit={50}
                  limitClassName="text-red-600"
                  labelClassName="flex w-11/12 justify-between z-[-1] ml-4 absolute top-0 text-[16px]"
                  containerClassName="relative my-2 h-14 rounded-[4px] text-placeholder text-lg border-placeholder border"
                  className="pt-6 px-4 placeholder-placeholder text-text tracking-wide w-full bg-transparent outline-none"
                  focusClasses="text-link border-link"
                  label="Name"
                />
                <InputCustom
                  autoComplete="off"
                  name="biography"
                  onChange={handleUserInfoChange}
                  defaultValue={userValues?.biography}
                  charsLimit={140}
                  limitClassName="text-red-600"
                  labelClassName="flex w-11/12 justify-between z-[-1] ml-4 absolute top-0 text-[16px]"
                  containerClassName="rounded-[4px] h-[120px] relative my-2 rounded-sm text-placeholder text-lg border-placeholder
                      border"
                  className="resize-none h-[120px] pt-[25px] px-4 placeholder-placeholder text-text tracking-wide w-full
                    bg-transparent outline-none text-ellipsis"
                  focusClasses="text-link border-link"
                  label="Biography"
                  textarea
                />
                <InputCustom
                  autoComplete="off"
                  name="location"
                  onChange={handleUserInfoChange}
                  defaultValue={userValues?.location}
                  charsLimit={50}
                  limitClassName="text-red-600"
                  labelClassName="flex w-11/12 justify-between z-[-1] ml-4 absolute top-0 text-[16px]"
                  containerClassName="relative my-2 h-14 rounded-[4px] text-placeholder text-lg border-placeholder border"
                  className="pt-6 px-4 placeholder-placeholder text-text tracking-wide w-full bg-transparent outline-none"
                  focusClasses="text-link border-link"
                  label="Location"
                />
                <InputCustom
                  autoComplete="off"
                  name="birthday"
                  onChange={handleUserInfoChange}
                  defaultValue={userValues?.birthday || dateFrom18Years}
                  max={dateFrom18Years}
                  labelClassName="flex w-11/12 justify-between z-[-1] ml-4 absolute top-0 text-[16px]"
                  containerClassName="relative my-2 h-14 rounded-[4px] text-placeholder text-lg border-placeholder border"
                  className="datepicker pt-6 px-4 placeholder-placeholder text-text tracking-wide w-full bg-transparent outline-none"
                  focusClasses="text-link border-link"
                  label="Birthday"
                  type="date"
                />
              </div>
            </div>
          </form>
        </div>
      </Dialog>
    </Transition>
  );
};
