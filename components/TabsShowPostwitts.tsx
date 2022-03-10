import { Tab } from "@headlessui/react";
import {
  watchPostwittsByUser,
  watchPostwittsByUserByLikes,
} from "../firebase/clients/postwitts";
import { useEffect, useState } from "react";
import { PostwittsByUserList } from "./PostwittsByUserList";
import { TabFilterSelector } from "./TabFilterSelector";
import { db } from "../firebase/firebase.config";
import { watchPostwittsByUserByReposts } from "../firebase/clients/reposts";

export const TabsShowPostwitts = ({ userData }) => {
  const [totalPostwitts, setTotalPostwitts] = useState([]);
  const [postwittsLiked, setPostwittsLiked] = useState([]);
  const [reposts, setReposts] = useState([]);
  const [postwitts, setPostwitts] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    watchPostwittsByUser(userData.uid, setTotalPostwitts);
    watchPostwittsByUserByLikes(userData.uid, setPostwittsLiked);
    watchPostwittsByUserByReposts(userData.uid, setReposts);
    return () => {
      watchPostwittsByUser(userData.uid, setTotalPostwitts);
      watchPostwittsByUserByLikes(userData.uid, setPostwittsLiked);
      watchPostwittsByUserByReposts(userData.uid, setReposts);
    };
  }, [userData?.uid]);

  useEffect(() => {
    if (totalPostwitts.length === 0) return;

    if (index === 0) {
      setPostwitts(() => {
        let newPostwitts = [];
        totalPostwitts.forEach((post) => {
          if (post?.replied === null) {
            if (post.id === userData.pinned) {
              newPostwitts.unshift(post);
            } else {
              newPostwitts.push(post);
            }
          }
        });

        newPostwitts = [...newPostwitts, ...reposts].sort(
          (a, b) => b.timestamp - a.timestamp
        );
        return newPostwitts;
      });
    } else if (index === 1) {
      setPostwitts(() => {
        let newPostwitts = [];

        totalPostwitts.forEach((post) => {
          if (post.id === userData.pinned) {
            newPostwitts.unshift(post);
          } else {
            newPostwitts.push(post);
          }
        });

        newPostwitts = [...newPostwitts, ...reposts].sort(
          (a, b) => b.timestamp - a.timestamp
        );

        return newPostwitts;
      });
    } else if (index === 2) {
      setPostwitts(() => {
        return totalPostwitts.filter((postwitt) => postwitt.image);
      });
    } else if (index === 3) {
      setPostwitts(() => postwittsLiked);
    }

    return () => {
      setPostwitts([]);
    };
  }, [index, totalPostwitts, reposts, userData, postwittsLiked]);

  return (
    <div>
      <Tab.Group
        onChange={(index) => {
          setIndex(index);
        }}
      >
        <Tab.List className="border-secondary border-b pb-2 flex justify-between text-placeholder overflow-x-auto">
          <Tab as="div">
            {({ selected }) => (
              <TabFilterSelector selected={selected} title="Postwitts" />
            )}
          </Tab>
          <Tab as="div">
            {({ selected }) => (
              <TabFilterSelector
                selected={selected}
                title="Postwitts and answers"
              />
            )}
          </Tab>
          <Tab as="div">
            {({ selected }) => (
              <TabFilterSelector selected={selected} title="Media" />
            )}
          </Tab>
          <Tab as="div">
            {({ selected }) => (
              <TabFilterSelector selected={selected} title="Likes" />
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <PostwittsByUserList userData={userData} postwitts={postwitts} />
          </Tab.Panel>
          <Tab.Panel>
            <PostwittsByUserList userData={userData} postwitts={postwitts} />
          </Tab.Panel>
          <Tab.Panel>
            <PostwittsByUserList userData={userData} postwitts={postwitts} />
          </Tab.Panel>
          <Tab.Panel>
            <PostwittsByUserList userData={userData} postwitts={postwitts} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
