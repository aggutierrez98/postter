import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { LeftMenuLink } from "components";
import { useTranslation } from "hooks";
import { useSession } from "next-auth/react";

export const LeftMenuLinkList = ({ userInfo }) => {
  const { t } = useTranslation();
  const { data: session } = useSession();

  return (
    <div className="flex flex-col w-full mt-2">
      {session ? (
        <>
          <LeftMenuLink
            text={t("profile")}
            Icon={PersonOutlineOutlinedIcon}
            route={`/users/${userInfo.uid}`}
          />
          <LeftMenuLink
            text={t("explore")}
            Icon={TagOutlinedIcon}
            route={`/explore`}
          />
          <LeftMenuLink
            text={t("bookmarks")}
            Icon={BookmarkBorderOutlinedIcon}
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
