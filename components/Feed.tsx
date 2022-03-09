import { useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";
import { NewPostwitt, Postwitt } from "./index";
import { watchPostwitts } from "../firebase/clients/postwitts";
import { watchReposts } from "../firebase/clients/reposts";
import { PostwittInterface } from "interfaces";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { useSession } from "next-auth/react";
import { PostContext } from "context/posts/PostContext";

export const Feed = () => {
  const [totalPostwitts, setTotalPostwitts] = useState([]);
  const [reposts, setReposts] = useState([]);
  const [postwitts, setPostwitts] = useState([]);
  const { data: session } = useSession();
  const { setModalLeftMenuIsOpen } = useContext(PostContext);

  useEffect(() => watchPostwitts(setTotalPostwitts), [db]);
  useEffect(() => watchReposts(setReposts), [db]);
  useEffect(
    () =>
      setPostwitts(
        [...totalPostwitts, ...reposts].sort(
          (a, b) => b.timestamp - a.timestamp
        )
      ),
    [reposts, totalPostwitts]
  );

  return (
    <div className="border-l border-r border-secondary min-h-full">
      <div className="text-text flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-primary opacity-95">
        <img
          onClick={() => setModalLeftMenuIsOpen(true)}
          src={session?.user?.image}
          alt=""
          className="phone:hidden h-7 w-7 rounded-full xl:mr-2.5 mr-5"
        />
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
          <AutoAwesomeOutlinedIcon className="h-5 text-text" />
        </div>
      </div>
      <div className="hidden phone:flex">
        <NewPostwitt />
      </div>
      <div className="pb-72 border-t border-secondary ">
        {postwitts.map((postwitt: PostwittInterface) => {
          return (
            <Postwitt
              key={postwitt.id}
              postwittId={postwitt.id}
              postwitt={postwitt}
              repostedBy={postwitt.repostedBy}
              idOriginal={postwitt.idOriginal}
              timePostedOriginal={postwitt.timePostedOriginal}
            />
          );
        })}
      </div>
    </div>
  );
};
