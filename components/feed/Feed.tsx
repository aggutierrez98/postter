import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import defaultImage from "public/user-template.png";
import { PostContext } from "context";
import { PostwittInterface } from "interfaces";
import { NewPostwitt, Postwitt } from "components";
import { watchPostwitts, watchReposts } from "@f/index";

export const Feed = () => {
  const [totalPostwitts, setTotalPostwitts] = useState([]);
  const [reposts, setReposts] = useState([]);
  const [postwitts, setPostwitts] = useState([]);
  const { data: session } = useSession();
  const { setModalLeftMenuIsOpen } = useContext(PostContext);

  useEffect(() => watchPostwitts(setTotalPostwitts), []);
  useEffect(() => watchReposts(setReposts), []);
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
    <div className="border-l border-r border-custom-secondary min-h-full">
      <div className="text-custom-text flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-custom-primary opacity-95">
        <span className="phone:hidden xl:mr-2.5 mr-5">
          <Image
            height={28}
            width={28}
            onClick={() => setModalLeftMenuIsOpen(true)}
            src={session?.user.image ? session?.user.image : defaultImage}
            className="rounded-full"
            alt=""
          />
        </span>
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
          <AutoAwesomeOutlinedIcon className="h-5 text-custom-text" />
        </div>
      </div>
      <div className="hidden phone:flex">{session && <NewPostwitt />}</div>
      <div className="pb-72 border-t border-custom-secondary ">
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
