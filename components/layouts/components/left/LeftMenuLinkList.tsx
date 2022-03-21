import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { LeftMenuLink } from "components";
import { useTranslation } from "hooks";

export const LeftMenuLinkList = ({ userInfo }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full mt-2">
      <LeftMenuLink
        text={t("Profile")}
        Icon={PersonOutlineOutlinedIcon}
        route={`/users/${userInfo.uid}`}
      />
      <LeftMenuLink
        text={t("Explore")}
        Icon={TagOutlinedIcon}
        route={`/explore`}
      />
      <LeftMenuLink
        text={t("Bookmarks")}
        Icon={BookmarkBorderOutlinedIcon}
        route={`/bookmarks/${userInfo.uid}`}
      />
    </div>
  );
};
