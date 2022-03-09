import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { LeftMenuLink } from "./LeftMenuLink";

export const LeftMenuLinkList = ({ userInfo }) => {
  return (
    <div className="flex flex-col w-full mt-2">
      <LeftMenuLink
        text="Profile"
        Icon={PersonOutlineOutlinedIcon}
        route={`/users/${userInfo.uid}`}
      />
      <LeftMenuLink text="Explore" Icon={TagOutlinedIcon} route={`/explore`} />
      <LeftMenuLink
        text="Bookmarks"
        Icon={BookmarkBorderOutlinedIcon}
        route={`/bookmarks/${userInfo.uid}`}
      />
    </div>
  );
};
