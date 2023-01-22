import { Fragment, memo, useEffect, useLayoutEffect, useState } from "react";
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
} from "@firebase";
import { PostwittInterface } from "interfaces";
import {
  TimeFormated,
  PostwittActions,
  MenuPostwitt,
  UserImage,
} from "components";
import { useTranslation } from "hooks";
import { Transition } from "@headlessui/react";
import { usePostwitt } from "hooks/usePostwitt";

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

const InitPostwitt = ({
  postwittId,
  postwitt,
  postPage,
  pinned,
  timestampFromServer,
  repostedBy,
  idOriginal,
  timePostedOriginal,
}: Props) => {
  const { t } = useTranslation();
  const { data: session } = useSession();

  const { isPostwittShown, liked, likes, replies, reposted, reposts } =
    usePostwitt({
      idOriginal,
      postwittId,
      repostedBy,
    });

  return (
    <article
      className="cursor-pointer hover:bg-gray-400/10 dark:hover:bg-black/5"
      onMouseUp={(e) => {
        if (e.button === 1) {
          window.open(
            `/postwitts/${repostedBy ? idOriginal : postwittId}`,
            "_blank"
          );
        }
      }}
    >
      <Transition
        show={isPostwittShown}
        as="div"
        enter="ease-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Link
          href={`/postwitts/${repostedBy ? idOriginal : postwittId}`}
          passHref
        >
          <div>
            {pinned && (
              <div className="flex items-center text-custom-placeholder pl-8 pt-2 text-sm font-bold ">
                <PushPinIcon className="scale-75" />
                Postwitt {t("pinned")}
              </div>
            )}
            {repostedBy && (
              <div className="flex items-center text-custom-placeholder pl-8 pt-2 text-sm font-bold ">
                <RepeatOutlinedIcon className="scale-75" />
                {repostedBy} {t("reposted")}
              </div>
            )}
            <div className="p-3 flex cursor-pointer border-b border-custom-secondary transition-all">
              {!postPage && <UserImage postwitt={postwitt} />}
              <div className="flex flex-col space-y-2 w-full min-w-0 relative">
                <div className={`flex flex-col`}>
                  <div className="text-custom-placeholder flex items-center">
                    {postPage ? (
                      <>
                        <UserImage postwitt={postwitt} />
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
                              ? new Date(
                                  postwitt?.timestamp?.toDate().toString()
                                )
                              : new Date()
                          }
                        />
                      )}
                    </span>
                  </div>
                )}
                {postwitt?.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="rounded-2xl max-h-[700px] mr-1"
                    src={postwitt.image}
                  />
                  //TODO: Improve image to quit layout shift without losing style
                  // <div className="w-[100%] h-[300px] relative">
                  //   <Image
                  //     src={postwitt.image}
                  //     layout="fill"
                  //     objectFit="contain"
                  //     className="rounded-2xl mr-1 w-[100%]"
                  //   />
                  // </div>
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
          </div>
        </Link>
      </Transition>
    </article>
  );
};

export const Postwitt = memo(InitPostwitt);
