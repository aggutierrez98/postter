import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import PushPinIcon from "@mui/icons-material/PushPin";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import {
  watchPostwittReplies,
  watchPostwittReposts,
  watchPostwittLikes,
} from "@f/index";
import { PostwittInterface } from "interfaces";
import { TimeFormated, PostwittActions, MenuPostwitt } from "components";
import { useTranslation } from "hooks";

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
  const { t } = useTranslation();
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
          <div className="flex items-center text-custom-placeholder ml-8 mt-2 text-sm font-bold ">
            <PushPinIcon className="scale-75" />
            Postwitt {t("pinned")}
          </div>
        )}
        {repostedBy && (
          <div className="flex items-center text-custom-placeholder ml-8 mt-2 text-sm font-bold ">
            <RepeatOutlinedIcon className="scale-75" />
            {repostedBy} {t("reposted")}
          </div>
        )}
        <div className="p-3 flex cursor-pointer border-b border-custom-secondary hover:bg-gray-400/10 dark:hover:bg-black/5 transition-all">
          {!postPage && (
            <Link href={`/users/${postwitt.userId}`} passHref>
              {/* <a> */}
              <span className="mr-4">
                <Image
                  width={44}
                  height={44}
                  src={postwitt?.userImg}
                  alt=""
                  className="rounded-full"
                />
              </span>
              {/* </a> */}
            </Link>
          )}
          <div className="flex flex-col space-y-2 w-full min-w-0">
            <div className={`flex flex-col`}>
              <div className="text-custom-placeholder flex items-center">
                <Link href={`/users/${postwitt.userId}`}>
                  {postPage ? (
                    <>
                      <span className="mr-4">
                        <Image
                          width={44}
                          height={44}
                          src={postwitt?.userImg}
                          alt="Profile Pic"
                          className=" rounded-full "
                        />
                      </span>
                      <div className="flex flex-col">
                        <div className="flex flex-col">
                          <h4
                            className={`inline font-bold text-[15px] sm:text-base text-custom-text group-hover:underline truncate`}
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
                          className={`inline font-bold text-[15px] sm:text-base text-custom-text group-hover:underline`}
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
                  isUser={postwitt.userId === session?.user.uid}
                  postwittId={postwittId}
                  pinned={pinned}
                />
              </div>
              {!postPage && (
                <p className="text-custom-text text-[15px] sm:text-base mt-0.5 break-words mr-2">
                  {postwitt?.text}
                </p>
              )}
            </div>
            {postPage && (
              <div>
                <p className="text-custom-text mt-0.5 text-xl break-words mr-2 mb-3">
                  {postwitt?.text}
                </p>
                <span className="flex-shrink-0 text-custom-placeholder">
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
            {postwitt?.image && (
              // <span>
              //   <Image
              //     src={postwitt.image}
              //     alt=""
              //     className="rounded-2xl max-h-[700px] object-contain mr-2"
              //     height={700}
              //     width={700}
              //   />
              // </span>
              <div className="relative h-[500px]">
                <Image
                  src={postwitt.image}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-2xl max-h-[700px] object-contain mr-2"
                />
              </div>
            )}

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
