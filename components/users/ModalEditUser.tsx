import { useContext, useEffect } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LocalSeeOutlinedIcon from "@mui/icons-material/LocalSeeOutlined";
import defaultBanner from "public/banner.jpg";
import defaultImage from "public/user-template.png";
import { InputCustom } from "components";
import { useEditUser, useTranslation } from "hooks";
import { watchUser } from "@f/index";
import { UserContext } from "context";
import { LoadingCircle } from "components";

export const ModalEditUser = () => {
  const { modalIsOpen, setIsOpen, userId } = useContext(UserContext);

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
  } = useEditUser();

  useEffect(() => watchUser(userId, setUserValues), [userId, setUserValues]);
  const { t } = useTranslation();

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
          <Dialog.Overlay className="fixed inset-0 bg-custom-primary phone:bg-[#5b7083] phone:bg-opacity-40 transition-opacity">
            <LoadingCircle />
          </Dialog.Overlay>
          <form
            onSubmit={onSubmit}
            className="inline-block align-bottom bg-custom-primary rounded-2xl text-left phone:shadow-xl 
                transform transition-all sm:my-8 sm:align-middle sm:max-w-[600px] sm:w-full h-screen phone:h-auto"
          >
            <div className="flex items-center justify-between px-1.5 py-2 border-b border-custom-secondary">
              <div
                className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                onClick={() => setIsOpen(false)}
              >
                <CloseOutlinedIcon className="h-[22px] text-custom-text" />
              </div>
              <div className="text-custom-text font-bold ml-8 text-lg flex-grow">
                {t("edit profile")}
              </div>
              <button
                type="submit"
                className="rounded-3xl border-text border px-3 mr-2 bg-custom-text text-custom-primary font-bold ml-5 text-lg"
              >
                {t("save")}
              </button>
            </div>

            <div className="flex pt-5 pb-2.5 justify-center flex-col items-center relative">
              <div className="flex justify-center items-center">
                <div
                  title={t("add image")}
                  className="cursor-pointer mr-16 z-[1] rounded-full absolute w-[50px] h-[50px] bg-gray-400 bg-opacity-80 flex items-center 
                  justify-center text-custom-text hover:bg-opacity-60"
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
                  title={t("delete image")}
                  onClick={deleteBannerImg}
                  className="cursor-pointer ml-16 z-[1] rounded-full absolute w-[50px] h-[50px] bg-gray-400 bg-opacity-80 flex items-center 
                  justify-center text-custom-text hover:bg-opacity-60"
                >
                  <CloseOutlinedIcon />
                </div>
                <Image
                  className="object-cover object-center border-custom-secondary border-2"
                  width={581}
                  height={193.66}
                  src={
                    userValues?.bannerImg
                      ? userValues?.bannerImg
                      : defaultBanner
                  }
                />
              </div>
              <div
                className="self-start ml-5 bottom-[50px] h-[122px] w-[122px] relative bg-custom-primary rounded-full flex 
                    items-center justify-center"
              >
                <div
                  title={t("change_profile_image")}
                  className="cursor-pointer z-[1] rounded-full absolute w-[50px] h-[50px] bg-gray-400 bg-opacity-80 flex items-center 
                  justify-center text-custom-text  hover:bg-opacity-60"
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
                  containerClassName="relative my-2 h-14 rounded-[4px] text-custom-placeholder text-lg border-custom-placeholder border"
                  className="pt-6 px-4 placeholder-custom-placeholder text-custom-text tracking-wide w-full bg-transparent outline-none"
                  focusClasses="text-[#ae5eff] border-custom-link"
                  label={t("name")}
                />
                <InputCustom
                  autoComplete="off"
                  name="biography"
                  onChange={handleUserInfoChange}
                  defaultValue={userValues?.biography}
                  charsLimit={140}
                  limitClassName="text-red-600"
                  labelClassName="flex w-11/12 justify-between z-[-1] ml-4 absolute top-0 text-[16px]"
                  containerClassName="rounded-[4px] h-[120px] relative my-2 rounded-sm text-custom-placeholder text-lg border-custom-placeholder
                      border"
                  className="resize-none h-[120px] pt-[25px] px-4 placeholder-custom-placeholder text-custom-text tracking-wide w-full
                      bg-transparent outline-none text-ellipsis"
                  focusClasses="text-[#ae5eff] border-custom-link"
                  label={t("biography")}
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
                  containerClassName="relative my-2 h-14 rounded-[4px] text-custom-placeholder text-lg border-custom-placeholder border"
                  className="pt-6 px-4 placeholder-custom-placeholder text-custom-text tracking-wide w-full bg-transparent outline-none"
                  focusClasses="border-custom-link text-[#ae5eff]"
                  label={t("location")}
                />
                <InputCustom
                  autoComplete="off"
                  name="birthday"
                  onChange={handleUserInfoChange}
                  defaultValue={userValues?.birthday || dateFrom18Years}
                  max={dateFrom18Years}
                  labelClassName="flex w-11/12 justify-between z-[-1] ml-4 absolute top-0 text-[16px]"
                  containerClassName="relative my-2 h-14 rounded-[4px] text-custom-placeholder text-lg border-custom-placeholder border"
                  className="datepicker pt-6 px-4 placeholder-custom-placeholder text-custom-text tracking-wide w-full bg-transparent outline-none"
                  focusClasses="text-[#ae5eff] border-custom-link"
                  label={t("birthday")}
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
