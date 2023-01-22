import { useCopyToClipboard, useTranslation } from "hooks";
import { Menu, Transition } from "@headlessui/react";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import DoneIcon from "@mui/icons-material/Done";
import { bookmartPostwitt, unBookmartPostwitt } from "@firebase";
import { Fragment, useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";
import { watchUser } from "@firebase";
import { UserInterface } from "interfaces";
import { UserContext } from "../../context/users/UserContext";

const domain = typeof window === "undefined" ? "" : window.location.origin;

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
  const { setModalToLoginOpen } = useContext(UserContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (session) {
      watchUser(session?.user.uid, setUserData);
      return () => {
        setIsBookmarked(false);
        setUserData({
          uid: null,
          name: null,
          email: null,
          tag: null,
          image: null,
          bannerImg: null,
          biography: null,
          location: null,
          birthday: null,
          pinned: null,
          bookmarks: null,
          following: null,
          followers: null,
        });
        setOperation({
          success: false,
          action: null,
        });
      };
    }
  }, [session, session?.user.uid]);

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
            <IosShareOutlinedIcon className="h-5 group-hover:text-custom-link" />
          </Menu.Button>
          <Transition
            className="w-0 absolute top-[0] right-[0] "
            as={"div"}
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              onClick={(e) => e.preventDefault()}
              className="fixed inset-0 h-screen w-screen cursor-default"
            />
            <Menu.Items
              onClick={(e) => e.preventDefault()}
              className="top-[0] right-[0] absolute bg-custom-primary text-custom-placeholder rounded-sm flex flex-col 
                  items-start px-5 py-1 text-[18px] z-10 shadow-sh"
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
                  className="hover:text-custom-text my-3 flex items-center w-full truncate"
                >
                  <BookmarkAddOutlinedIcon className="mr-3" />
                  <span className="w-full text-left">
                    {t("remove from bookmarks")}
                  </span>
                </Menu.Item>
              ) : (
                <Menu.Item
                  as="button"
                  onClick={async () => {
                    if (!session) return setModalToLoginOpen(true);
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
                  className="hover:text-custom-text my-3 flex items-center w-full truncate"
                >
                  <BookmarkAddOutlinedIcon className="mr-3" />
                  <span className="w-full text-left">
                    {t("add to bookmarks")}
                  </span>
                </Menu.Item>
              )}

              <Menu.Item
                as="button"
                onClick={() => {
                  // if (!session) return setModalToLoginOpen(true);
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
                className="hover:text-custom-text my-3 flex items-center w-full truncate"
              >
                <ContentCopyOutlinedIcon className="mr-3" />
                <span className="w-full text-left">
                  {t("copy postwitt_link")}
                </span>
              </Menu.Item>
            </Menu.Items>
          </Transition>
          {operation.success && (
            <div
              onClick={(e) => e.preventDefault()}
              className="fixed flex items-center justify-between bottom-[32px] left-[32px] bg-custom-link text-custom-primary p-[12px] px-6 rounded-[3px]  
              text-[20px] phone:text-sm pointer-events-none z-[55]"
            >
              <DoneIcon className="mr-2" />
              {operation.action === "clipboard" && t("postwitt copy_clipboard")}
              {operation.action === "bookmarked" &&
                t("postwitt added_bookmarks")}
              {operation.action === "unbookmarked" &&
                t("postwitt removed_bookmarks")}
            </div>
          )}
        </>
      )}
    </Menu>
  );
};
