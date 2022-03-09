import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { PostContext, PostContextProps } from "context/posts/PostContext";
import { likePostwitt } from "../firebase/clients/likes";
import { DocumentData } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { MenuSharePostwitt } from "./MenuSharePostwitt";
import { repostPostwitt } from "../firebase/clients/reposts";

interface Props {
  uid: string;
  id: string;
  postPage?: boolean;
  commentId?: string;
  likes: DocumentData[];
  reposts: DocumentData[];
  liked?: boolean;
  reposted?: boolean;
  replies: DocumentData[];
}

export const PostwittActions = ({
  id,
  postPage,
  likes,
  liked,
  reposted,
  reposts,
  replies,
}: Props) => {
  const { setModalReplyIsOpen, setPostwittId } =
    useContext<PostContextProps>(PostContext);
  const { data: session } = useSession<boolean>();

  return (
    <div
      className={`text-placeholder flex justify-between w-10/12 relative ${
        postPage && "mx-auto"
      }`}
    >
      <div
        className="flex items-center space-x-1 group"
        onClick={(e) => {
          e.preventDefault();
          setPostwittId(id);
          setModalReplyIsOpen(true);
        }}
      >
        <div className="icon group-hover:bg-link group-hover:bg-opacity-10">
          <ModeCommentOutlinedIcon className="h-5 group-hover:text-link" />
        </div>
        {replies.length > 0 && (
          <span className="group-hover:text-link text-sm">
            {replies.length}
          </span>
        )}
      </div>
      <div
        className="flex items-center space-x-1 group"
        onClick={async (e) => {
          e.preventDefault();
          repostPostwitt(id, session.user, reposted);
        }}
      >
        <div className="icon group-hover:bg-green-500/10">
          <RepeatOutlinedIcon
            className={`h-5 group-hover:text-green-500 ${
              reposted && " text-green-600"
            }`}
          />
        </div>
        {reposts.length > 0 && (
          <span
            className={`group-hover:text-green-500 text-sm ${
              reposted && "text-green-600"
            }`}
          >
            {reposts.length}
          </span>
        )}
      </div>
      <div
        className="flex items-center space-x-1 group"
        onClick={async (e) => {
          e.preventDefault();
          likePostwitt(id, session.user, liked);
        }}
      >
        <div className="icon group-hover:bg-pink-600/10">
          {liked ? (
            <FavoriteIcon className="h-5 text-pink-600" />
          ) : (
            <FavoriteBorderIcon className="h-5 group-hover:text-pink-600" />
          )}
        </div>
        {likes.length > 0 && (
          <span
            className={`group-hover:text-pink-600 text-sm ${
              liked && "text-pink-600"
            }`}
          >
            {likes.length}
          </span>
        )}
      </div>
      <MenuSharePostwitt postwittId={id} />
    </div>
  );
};
