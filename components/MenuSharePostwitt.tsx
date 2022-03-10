import { useCopyToClipboard } from "@h/useCopyToClipboard";
import { Menu, Transition } from "@headlessui/react";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import {
  bookmartPostwitt,
  unBookmartPostwitt,
} from "../firebase/clients/postwitts";
import { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { watchUser } from "../firebase/clients/users";
import { db } from "../firebase/firebase.config";
import { UserInterface } from "interfaces";

const domain = "http://localhost:3000";

export const MenuSharePostwitt = ({ postwittId }: { postwittId: string }) => {
  const {
    copyToClipboard,
    data: { success },
  } = useCopyToClipboard();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userData, setUserData] = useState<UserInterface>();
  const { data: session } = useSession();
  const [operation, setOperation] = useState({
    success: false,
    action: null,
  });

  useEffect(
    () => watchUser(session.user.uid, setUserData),
    [session?.user.uid]
  );

  useEffect(() => {
    if (userData?.bookmarks?.includes(postwittId)) {
      setIsBookmarked(true);
    }

    return () => {
      setIsBookmarked(false);
    };
  }, [userData, postwittId]);

  const sendSuccess = () => {
    setOperation({ success: true, action: "clipboard" });
    setTimeout(() => {
      setOperation({
        success: false,
        action: null,
      });
    }, 3500);
  };

  useEffect(() => {
    if (success) sendSuccess();
  }, [success]);

  return (
    <Menu as={Fragment}>
      {({ open }) => (
        <>
          <Menu.Button as="div" className="icon group ">
            <IosShareOutlinedIcon className="h-5 group-hover:text-link" />
          </Menu.Button>
          <Transition
            as={Fragment}
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Menu.Items
              onClick={(e) => e.preventDefault()}
              className="top-[0] right-[0] absolute bg-primary text-placeholder rounded-sm flex flex-col 
            items-start px-5 py-1 text-[18px] z-[1]"
            >
              {isBookmarked ? (
                <Menu.Item
                  as="button"
                  onClick={async () => {
                    const success = await unBookmartPostwitt(
                      postwittId,
                      session.user.uid
                    );
                    if (success) {
                      setOperation({
                        success,
                        action: "unbookmarked",
                      });
                      setTimeout(
                        () =>
                          setOperation({
                            success: false,
                            action: null,
                          }),
                        3500
                      );
                    }
                  }}
                  className="hover:text-text my-3 flex items-center w-full truncate"
                >
                  <BookmarkAddOutlinedIcon className="mr-3" />
                  <span className="w-full text-left">
                    Remove from bookmarts
                  </span>
                </Menu.Item>
              ) : (
                <Menu.Item
                  as="button"
                  onClick={async () => {
                    const success = await bookmartPostwitt(
                      postwittId,
                      session.user.uid
                    );
                    if (success) {
                      setOperation({
                        success,
                        action: "bookmarked",
                      });
                      setTimeout(
                        () =>
                          setOperation({
                            success: false,
                            action: null,
                          }),
                        3500
                      );
                    }
                  }}
                  className="hover:text-text my-3 flex items-center w-full truncate"
                >
                  <BookmarkAddOutlinedIcon className="mr-3" />
                  <span className="w-full text-left">Add to bookmarts</span>
                </Menu.Item>
              )}

              <Menu.Item
                as="button"
                onClick={() => {
                  copyToClipboard(`${domain}/postwitts/${postwittId}`);
                  setTimeout(
                    () =>
                      setOperation({
                        success: false,
                        action: null,
                      }),
                    3500
                  );
                }}
                className="hover:text-text my-3 flex items-center w-full truncate"
              >
                <ContentCopyOutlinedIcon className="mr-3" />
                <span className="w-full text-left">Copy Postwitt link</span>
              </Menu.Item>
            </Menu.Items>
          </Transition>
          {operation.success && (
            <div
              onClick={(e) => e.preventDefault()}
              className="fixed bottom-[32px] left-[32px] bg-link text-primary p-[12px] rounded-[3px] z-[2] 
              text-[18px] pointer-events-none"
            >
              {operation.action === "clipboard" && "Copied to clipboard"}
              {operation.action === "bookmarked" &&
                "Postwitt added to bookmarks"}
              {operation.action === "unbookmarked" &&
                " Postwitt removed from bookmarks"}
            </div>
          )}
        </>
      )}
    </Menu>
  );
};
