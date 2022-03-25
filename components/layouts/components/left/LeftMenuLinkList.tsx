import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { LeftMenuLink } from "components";
import { useTranslation } from "hooks";
import { useSession } from "next-auth/react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import TagIcon from "@mui/icons-material/Tag";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export const LeftMenuLinkList = ({ userInfo }) => {
  const { t } = useTranslation();
  const { data: session } = useSession();

  return (
    <div className="flex flex-col w-full mt-2">
      <LeftMenuLink
        text={t("home")}
        Icon={HomeOutlinedIcon}
        ActiveIcon={HomeIcon}
        route={"/"}
      />
      {session ? (
        <>
          <LeftMenuLink
            text={t("profile")}
            Icon={PersonOutlineOutlinedIcon}
            ActiveIcon={PersonIcon}
            route={`/users/${userInfo.uid}`}
          />
          <LeftMenuLink
            text={t("explore")}
            Icon={TagOutlinedIcon}
            ActiveIcon={TagIcon}
            route={`/explore`}
          />
          <LeftMenuLink
            text={t("bookmarks")}
            Icon={BookmarkBorderOutlinedIcon}
            ActiveIcon={BookmarkIcon}
            route={`/bookmarks/${userInfo.uid}`}
          />
        </>
      ) : (
        <LeftMenuLink
          text={t("login")}
          Icon={PersonOutlineOutlinedIcon}
          route={`/auth/login`}
        />
      )}
    </div>
  );
};
