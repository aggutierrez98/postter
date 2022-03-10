import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { PostContext } from "context/posts/PostContext";
import { useSession } from "next-auth/react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { followUser, unfollowUser, watchUser } from "../firebase/clients/users";
import { db } from "../firebase/firebase.config";
import { UserInterface } from "interfaces";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

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
  }, [userData, setIsFollowing, session.user.uid]);

  return (
    <Menu
      role="menu"
      as="span"
      className="relative h-5 flex items-center ml-auto "
    >
      {({ open }) => (
        <>
          <Menu.Button as="span" className="icon group">
            <MoreHorizOutlinedIcon className="h-5 text-placeholder group-hover:text-link" />
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
            <Menu.Items
              onClick={(e) => e.preventDefault()}
              className="top-[-10px] right-0 absolute bg-primary text-placeholder rounded-sm flex flex-col 
                items-start px-5 py-1 text-[18px] z-[1]"
            >
              {isUser ? (
                <>
                  <Menu.Item
                    as="button"
                    onClick={() => {
                      setModalConfirmData({
                        title: "Confirm delete postwitt?",
                        description: `This action cannot be reversed, and you will be removed from your profile, the timeline of accounts 
                    that follow you, and Postter search results.`,
                        action: "Delete",
                        danger: true,
                      });
                      setPostwittId(postwittId);
                      setModalConfirmIsOpen(true);
                    }}
                    className="hover:text-red-600 my-3 flex items-center w-full truncate text-red-800"
                  >
                    <DeleteOutlinedIcon className="mr-3" />
                    <span className="w-full text-left">Delete</span>
                  </Menu.Item>
                  {pinned ? (
                    <Menu.Item
                      as="button"
                      onClick={() => {
                        setModalConfirmData({
                          title: "Confirm pin off postwitt?",
                          description:
                            "This will no longer automatically appear at the top of your profile",
                          action: "Pin off",
                          danger: false,
                        });
                        setPostwittId(postwittId);
                        setModalConfirmIsOpen(true);
                      }}
                      className="hover:text-text my-3 flex items-center w-full truncate"
                    >
                      <PushPinOutlinedIcon className="mr-3" />
                      <span className="w-full text-left">Pin off Postwitt</span>
                    </Menu.Item>
                  ) : (
                    <Menu.Item
                      as="button"
                      onClick={() => {
                        setModalConfirmData({
                          title: "Confirm pin on postwitt?",
                          description:
                            "This Postwitt will appear at the top of your profile and will replace any other Postwitts you've previously pinned.",
                          action: "Pin on",
                          danger: false,
                        });
                        setPostwittId(postwittId);
                        setModalConfirmIsOpen(true);
                      }}
                      className="hover:text-text my-3 flex items-center w-full truncate"
                    >
                      <PushPinOutlinedIcon className="mr-3" />
                      <span className="w-full text-left">Pin on Postwitt</span>
                    </Menu.Item>
                  )}
                </>
              ) : (
                <>
                  {isFollowing ? (
                    <Menu.Item
                      as="button"
                      onClick={() => unfollowUser(session.user.uid, userId)}
                      className="hover:text-text my-3 flex items-center w-full truncate"
                    >
                      <PersonAddAltOutlinedIcon className="mr-3" />
                      <span className="w-full text-left">Unfollow</span>
                    </Menu.Item>
                  ) : (
                    <Menu.Item
                      as="button"
                      onClick={() => followUser(session.user.uid, userId)}
                      className="hover:text-text my-3 flex items-center w-full truncate"
                    >
                      <PersonAddAltOutlinedIcon className="mr-3" />
                      <span className="w-full text-left">Follow</span>
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
