import { Menu, Transition } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { PostContext } from "context";
import { useSession } from "next-auth/react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { followUser, unfollowUser, watchUser } from "@f/index";
import { UserInterface } from "interfaces";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useTranslation } from "hooks";
import { useRouter } from "next/router";

interface Props {
  userId: string;
  isUser: boolean;
  postwittId: string;
  pinned: boolean;
}

export const MenuPostwitt = ({ isUser, userId, postwittId, pinned }: Props) => {
  const { setModalConfirmIsOpen, setModalConfirmData, setPostwittId } =
    useContext(PostContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [userData, setUserData] = useState<UserInterface>();
  const { data: session } = useSession();
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => watchUser(userId, setUserData), [userId]);

  useEffect(() => {
    if (userData?.followers?.includes(session.user.uid)) {
      setIsFollowing(true);
    } else setIsFollowing(false);

    return () => {
      if (userData?.followers?.includes(session.user.uid)) {
        setIsFollowing(true);
      } else setIsFollowing(false);
    };
  }, [userData, setIsFollowing, session?.user.uid]);

  return (
    <Menu
      role="menu"
      as="span"
      className="relative h-5 flex items-center ml-auto "
    >
      {({ open }) => (
        <>
          <Menu.Button as="span" className="icon group">
            <MoreHorizOutlinedIcon className="h-5 text-custom-placeholder group-hover:text-custom-link" />
          </Menu.Button>
          <Transition
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
              className="top-[-10px] right-0 absolute bg-custom-primary text-custom-placeholder rounded-sm flex flex-col 
                items-start px-5 py-1 text-[18px] z-[1] shadow-sh"
            >
              {isUser ? (
                <>
                  <Menu.Item
                    as="button"
                    onClick={() => {
                      setModalConfirmData({
                        title: `${t("confirm delete postwitt")}?`,
                        description: t("CD"),
                        action: "delete",
                        danger: true,
                      });
                      setPostwittId(postwittId);
                      setModalConfirmIsOpen(true);
                    }}
                    className="hover:text-red-600 my-3 flex items-center w-full truncate text-red-800"
                  >
                    <DeleteOutlinedIcon className="mr-3" />
                    <span className="w-full text-left">{t("delete")}</span>
                  </Menu.Item>
                  {pinned ? (
                    <Menu.Item
                      as="button"
                      onClick={() => {
                        setModalConfirmData({
                          title: `${t("confirm pin_off postwitt")}?`,
                          description: t("CUP"),
                          action: "pin_off",
                          danger: false,
                        });
                        setPostwittId(postwittId);
                        setModalConfirmIsOpen(true);
                      }}
                      className="hover:text-custom-text my-3 flex items-center w-full truncate"
                    >
                      <PushPinOutlinedIcon className="mr-3" />
                      <span className="w-full text-left">
                        {t("pin_off")} Postwitt
                      </span>
                    </Menu.Item>
                  ) : (
                    <Menu.Item
                      as="button"
                      onClick={() => {
                        setModalConfirmData({
                          title: `${t("confirm pin_on postwitt")}?`,
                          description: t("CP"),
                          action: "pin_on",
                          danger: false,
                        });
                        setPostwittId(postwittId);
                        setModalConfirmIsOpen(true);
                      }}
                      className="hover:text-custom-text my-3 flex items-center w-full truncate"
                    >
                      <PushPinOutlinedIcon className="mr-3" />
                      <span className="w-full text-left">
                        {t("pin_on")} Postwitt
                      </span>
                    </Menu.Item>
                  )}
                </>
              ) : (
                <>
                  {isFollowing ? (
                    <Menu.Item
                      as="button"
                      onClick={() => {
                        unfollowUser(session.user.uid, userId);
                      }}
                      className="hover:text-custom-text my-3 flex items-center w-full truncate"
                    >
                      <PersonAddAltOutlinedIcon className="mr-3" />
                      <span className="w-full text-left">{t("unfollow")}</span>
                    </Menu.Item>
                  ) : (
                    <Menu.Item
                      as="button"
                      onClick={() => {
                        if (!session) return router.push("/auth/login");
                        followUser(session.user.uid, userId);
                      }}
                      className="hover:text-custom-text my-3 flex items-center w-full truncate"
                    >
                      <PersonAddAltOutlinedIcon className="mr-3" />
                      <span className="w-full text-left">{t("follow")}</span>
                    </Menu.Item>
                  )}
                </>
              )}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
