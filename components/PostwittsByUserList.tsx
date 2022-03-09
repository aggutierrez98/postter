import { Postwitt } from "./Postwitt";
import { UserInterface } from "interfaces";

interface Props {
  postwitts?: any[];
  userData: UserInterface;
}

export const PostwittsByUserList = ({ userData, postwitts }: Props) => {
  return (
    <div className="pb-72">
      {postwitts.map((postwitt) => {
        return (
          <Postwitt
            key={postwitt.id}
            postwittId={postwitt.id}
            postwitt={postwitt}
            pinned={postwitt.id === userData.pinned}
            repostedBy={postwitt.repostedBy}
            idOriginal={postwitt.idOriginal}
            timePostedOriginal={postwitt.timePostedOriginal}
          />
        );
      })}
    </div>
  );
};
