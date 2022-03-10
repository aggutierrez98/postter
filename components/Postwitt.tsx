import { DocumentData } from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";
import { TimeFormated } from "./index";
import { PostwittInterface } from "../interfaces/index";
import PushPinIcon from "@mui/icons-material/PushPin";
import { PostwittActions } from "./PostwittActions";
import Link from "next/link";
import { watchPostwittLikes } from "../firebase/clients/likes";
import { watchPostwittReplies } from "../firebase/clients/postwitts";
import { MenuPostwitt } from "./MenuPostwitt";
import { watchPostwittReposts } from "../firebase/clients/reposts";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";

interface Props {
  postwittId: string;
  postwitt: PostwittInterface;
  postPage?: boolean;
  pinned?: boolean;
  timestampFromServer?: string;
  repostedBy?: string;
  idOriginal?: string;
  timePostedOriginal?: any;
}

export const Postwitt = ({
  postwittId,
  postwitt,
  postPage,
  pinned,
  timestampFromServer,
  repostedBy,
  idOriginal,
  timePostedOriginal,
}: Props) => {
  const { data: session } = useSession<boolean>();
  const [replies, setReplies] = useState<DocumentData[]>([]);
  const [likes, setLikes] = useState<DocumentData[]>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [reposted, setReposted] = useState(false);
  const [reposts, setReposts] = useState([]);

  useEffect(
    () =>
      watchPostwittReplies(repostedBy ? idOriginal : postwittId, setReplies),
    [postwittId, repostedBy, idOriginal]
  );
  useEffect(
    () => watchPostwittLikes(repostedBy ? idOriginal : postwittId, setLikes),
    [postwittId, repostedBy, idOriginal]
  );
  useEffect(
    () =>
      watchPostwittReposts(repostedBy ? idOriginal : postwittId, setReposts),
    [postwittId, repostedBy, idOriginal]
  );
  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes, session?.user.uid]
  );
  useEffect(
    () =>
      setReposted(
        reposts.findIndex(
          (repost) => repost.data().userId === session?.user.uid
        ) !== -1
      ),
    [reposts, session?.user.uid]
  );

  return (
    <Link href={`/postwitts/${repostedBy ? idOriginal : postwittId}`}>
      <a>
        {pinned && (
          <div className="flex items-center text-placeholder ml-8 mt-2 text-sm font-bold ">
            <PushPinIcon className="scale-75" />
            Postwitt pinned
          </div>
        )}
        {repostedBy && (
          <div className="flex items-center text-placeholder ml-8 mt-2 text-sm font-bold ">
            <RepeatOutlinedIcon className="scale-75" />
            {repostedBy} reposted
          </div>
        )}
        <div className="p-3 flex cursor-pointer border-b border-secondary">
          {!postPage && (
            <Link href={`/users/${postwitt.userId}`}>
              <img
                src={postwitt?.userImg}
                alt=""
                className="h-11 w-11 rounded-full mr-4"
              />
            </Link>
          )}
          <div className="flex flex-col space-y-2 w-full min-w-0">
            <div className={`flex flex-col`}>
              <div className="text-placeholder flex items-center">
                <Link href={`/users/${postwitt.userId}`}>
                  {postPage ? (
                    <>
                      <img
                        src={postwitt?.userImg}
                        alt="Profile Pic"
                        className="h-11 w-11 rounded-full mr-4"
                      />
                      <div className="flex flex-col">
                        <div className="flex flex-col">
                          <h4
                            className={`inline font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline truncate`}
                          >
                            {postwitt?.userName}
                          </h4>
                          <p
                            className={`inline text-sm sm:text-[15px] mr-2 truncate`}
                          >
                            @{postwitt?.tag}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="truncate">
                        <h4
                          className={`inline font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline`}
                        >
                          {postwitt?.userName}
                        </h4>
                        <p
                          className={`inline text-sm sm:text-[15px] mr-2 ml-[5px]`}
                        >
                          @{postwitt?.tag}
                        </p>
                      </span>
                      ·
                      <span className="ml-2 mr-2 flex-shrink-0 ">
                        {postwitt && (
                          <TimeFormated
                            time={
                              repostedBy
                                ? new Date(
                                    timePostedOriginal.toDate().toString()
                                  )
                                : timestampFromServer
                                ? new Date(timestampFromServer)
                                : postwitt?.timestamp
                                ? new Date(
                                    postwitt?.timestamp?.toDate().toString()
                                  )
                                : new Date()
                            }
                          />
                        )}
                      </span>
                    </>
                  )}
                </Link>
                <MenuPostwitt
                  userId={postwitt.userId}
                  isUser={postwitt.userId === session.user.uid}
                  postwittId={postwittId}
                  pinned={pinned}
                />
              </div>
              {!postPage && (
                <p className="text-text text-[15px] sm:text-base mt-0.5 break-words mr-2">
                  {postwitt?.text}
                </p>
              )}
            </div>
            {postPage && (
              <div>
                <p className="text-text mt-0.5 text-xl break-words mr-2 mb-3">
                  {postwitt?.text}
                </p>
                <span className="flex-shrink-0 text-placeholder">
                  {postwitt && (
                    <TimeFormated
                      time={
                        repostedBy
                          ? new Date(timePostedOriginal.toDate().toString())
                          : timestampFromServer
                          ? new Date(timestampFromServer)
                          : postwitt?.timestamp
                          ? new Date(postwitt?.timestamp?.toDate().toString())
                          : new Date()
                      }
                    />
                  )}
                </span>
              </div>
            )}
            <img
              src={postwitt?.image}
              alt=""
              className="rounded-2xl max-h-[700px] object-cover mr-2"
            />
            <PostwittActions
              id={repostedBy ? idOriginal : postwittId}
              postPage={postPage}
              likes={likes}
              liked={liked}
              reposts={reposts}
              reposted={reposted}
              replies={replies}
              uid={postwitt?.userId}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};
