import { useContext, useEffect } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import TagIcon from "@mui/icons-material/Tag";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AddCardIcon from "@mui/icons-material/AddCard";
import SettingsIcon from "@mui/icons-material/Settings";
import icon from "public/favicon.ico";
import defaultImage from "public/user-template.png";
import { LeftSidebarLink } from "components";
import { PostContext, UserContext } from "context";
import { useTranslation } from "hooks";
import { useRouter } from "next/router";
// // import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// // import NotificationsIcon from "@mui/icons-material/Notifications";
// // import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// // import EmailIcon from "@mui/icons-material/Email";

// // <Leftsidebarlink
// //   text="notifications"
// //   icon={notificationsnoneoutlinedicon}
// //   activeicon={notificationsicon}
// // />
// // <Leftsidebarlink
// //   text="messages"
// //   icon={emailoutlinedicon}
// //   activeicon={emailicon}
// // />

export const LeftSidebar = () => {
  const { data: session } = useSession<boolean>();
  const router = useRouter();
  const { setModalNewIsOpen } = useContext(PostContext);
  const { setModalConfigIsOpen } = useContext(UserContext);
  const { t } = useTranslation();

  return (
    <>
      <div
        className="hidden phone:flex flex-col items-center xl:items-start px-2 h-screen static md:ml-20 xl:ml-[10vw] xl:min-w-[270px] 3xl:ml-[15vw]
      4xl:ml-[20vw]"
      >
        <div className="flex items-center justify-center h-14 hoverAnimation ">
          <Image src={icon} width={30} height={30} />
        </div>
        <div className="space-y-2 mt-1 mb-2.5 ">
          <LeftSidebarLink
            text={t("home")}
            Icon={HomeOutlinedIcon}
            ActiveIcon={HomeIcon}
            route={"/"}
          />
          <LeftSidebarLink
            text={t("explore")}
            Icon={TagOutlinedIcon}
            ActiveIcon={TagIcon}
            route={`/explore`}
          />
          <LeftSidebarLink
            text={t("bookmarks")}
            Icon={BookmarkBorderOutlinedIcon}
            ActiveIcon={BookmarkIcon}
            route={session ? `/bookmarks/${session.user.uid}` : "/auth/login"}
          />
          <LeftSidebarLink
            text={t("profile")}
            Icon={PersonOutlineOutlinedIcon}
            ActiveIcon={PersonIcon}
            route={session ? `/users/${session.user.uid}` : "/auth/login"}
          />
          <button
            className="text-custom-text flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation hover:opacity-100
              opacity-80 w-full"
            onClick={() => {
              setModalConfigIsOpen(true);
            }}
          >
            <SettingsIcon className="h-7" />
            <span className="hidden xl:inline">{t("options")}</span>
          </button>
        </div>

        <button
          onClick={() => {
            if (!session) return router.push("/auth/login");
            setModalNewIsOpen(true);
          }}
          className="my-3 bg-custom-alternative text-white rounded-full w-[50px] xl:w-56 h-[50px] text-lg font-bold 
            shadow-md hover:opacity-80 transition-all"
        >
          <div className="inline xl:hidden">
            <AddCardIcon />
          </div>
          <span className="hidden xl:inline">Postwitt</span>
        </button>
        {session && (
          <div
            className="text-custom-text flex items-center justify-center mt-auto hoverAnimation xl:-mr-5 "
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}/auth/login`,
              })
            }
          >
            <Image
              width={40}
              height={40}
              src={session?.user.image ? session?.user.image : defaultImage}
              alt=""
              className="rounded-full"
            />
            <div className="hidden xl:inline leading-5 ml-2">
              <h4 className="font-bold truncate">{session.user.name}</h4>
              <p className="text-custom-terciary truncate">
                @{session.user.tag}
              </p>
            </div>
            <div className="hidden xl:inline ml-5">
              <MoreHorizOutlinedIcon />
            </div>
          </div>
        )}
      </div>
      <div
        className="flex justify-around phone:hidden fixed bottom-[0] w-full h-[53px] bg-custom-primary border-black border-0 border-top-2 
          dark:border-custom-secondary border-t-[1px] z-[2]"
      >
        <LeftSidebarLink
          text="Home"
          Icon={HomeOutlinedIcon}
          ActiveIcon={HomeIcon}
          route={"/"}
        />
        <LeftSidebarLink
          text="Explore"
          Icon={TagOutlinedIcon}
          ActiveIcon={TagIcon}
          route={`/explore`}
        />
        <LeftSidebarLink
          text="Bookmarks"
          Icon={BookmarkBorderOutlinedIcon}
          ActiveIcon={BookmarkIcon}
          route={session ? `/bookmarks/${session.user.uid}` : "/auth/login"}
        />
        <LeftSidebarLink
          text="Profile"
          Icon={PersonOutlineOutlinedIcon}
          ActiveIcon={PersonIcon}
          route={session ? `/users/${session.user.uid}` : "/auth/login"}
        />

        <button
          onClick={() => {
            if (!session) return router.push("/auth/login");
            setModalNewIsOpen(true);
          }}
          className="my-3 bg-custom-alternative text-white rounded-full w-[50px] h-[50px] text-lg font-bold 
            shadow-md hover:opacity-80 transition-all absolute right-[15px] bottom-[60px]"
        >
          <AddCardIcon />
          <span className="hidden xl:inline">Postwitt</span>
        </button>
      </div>
    </>
  );
};
