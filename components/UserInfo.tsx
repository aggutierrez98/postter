import { UserInterface } from "interfaces";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import defaultImage from "public/banner.jpg";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { UserContext } from "../context/users/UserContext";
import { useSession } from "next-auth/react";
import { followUser, unfollowUser } from "../firebase/clients/users";

interface Props {
  userInfo: UserInterface;
}

export const UserInfo = ({ userInfo }: Props) => {
  const { setIsOpen, setUserId } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [screenSize, setScreenSize] = useState({
    isPhone: false,
    isSm: false,
  });
  const { data: session } = useSession();

  useEffect(() => {
    if (userInfo?.followers?.includes(session.user.uid)) {
      setIsFollowing(true);
    }
  }, [userInfo, session?.user.uid]);

  const updateWidth = (e) => {
    const screenWidth = e.target.screen.width;
    setScreenSize({
      isPhone: screenWidth < 500,
      isSm: screenWidth < 640 && screenWidth > 500,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [screenSize]);

  return (
    <div className="flex scrollbar-hide relative flex-col">
      <Image
        className="object-cover object-center"
        width={600}
        height={200}
        src={userInfo.bannerImg ? userInfo.bannerImg : defaultImage}
      ></Image>
      <div className="px-4 py-3">
        <div className="flex w-full flex-col justify-between relative h-[70px]">
          <div
            className="absolute bottom-[15px] rounded-full p-[3px] sm:p-1.5 bg-primary flex 
          items-center justify-center"
          >
            <Image
              className="rounded-full"
              width={screenSize.isPhone ? 100 : screenSize.isSm ? 120 : 133.5}
              height={screenSize.isPhone ? 100 : screenSize.isSm ? 120 : 133.5}
              src={userInfo.image ? userInfo.image : defaultImage}
            ></Image>
          </div>
          {userInfo.uid === session.user.uid ? (
            <button
              onClick={() => {
                setIsOpen(true);
                setUserId(userInfo.uid);
              }}
              className="h-[36px] w-[120px] self-end border-[1px] rounded-3xl border-terciary text-text font-bold bg-primary
              hover:bg-opacity-80 ease-in-out"
            >
              Edit Profile
            </button>
          ) : (
            <>
              {isFollowing ? (
                <button
                  onClick={() => unfollowUser(session.user.uid, userInfo.uid)}
                  className="h-[36px] w-[90px] self-end border-[1px] rounded-3xl border-terciary text-primary bg-text 
                    font-bold hover:bg-opacity-90 ease-in-out"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => followUser(session.user.uid, userInfo.uid)}
                  className="h-[36px] w-[90px] self-end border-[1px] rounded-3xl border-terciary text-primary bg-text 
                    font-bold hover:bg-opacity-90 ease-in-out"
                >
                  Follow
                </button>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col h-[55px] text-text">
          <div className="font-bold text-lg">{userInfo.name}</div>
          <div className=" text-placeholder leading-3">@{userInfo.tag}</div>
        </div>
        <div className=" text-text font-bold">
          {userInfo.biography ? userInfo.biography : "No biography"}
        </div>
        <div className="text-placeholder leading-9 flex ml-[-5px] flex-col sm:flex-row">
          <span className="flex items-center ">
            <LocationOnOutlinedIcon className="scale-75" />
            {userInfo.location ? userInfo.location : "No location"}
          </span>
          <span className="sm:ml-3 flex items-center">
            <DateRangeOutlinedIcon className="scale-75" />
            {userInfo.birthday ? userInfo.birthday : "No birthday"}
          </span>
        </div>
        <div className="text-text leading-8">
          <span>
            <span className="text-text mr-1 font-bold">
              {userInfo.following ? userInfo.following.length : 0}
            </span>
            <span className="text-placeholder">Following</span>
          </span>
          <span className="ml-5">
            <span className="text-text mr-1 font-bold">
              {userInfo.followers ? userInfo.followers.length : 0}
            </span>
            <span className="text-placeholder">Followers</span>
          </span>
        </div>
      </div>
    </div>
  );
};
