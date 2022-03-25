import { Postwitt } from "components";
import { UserInterface } from "interfaces";

interface Props {
  postwitts?: any[];
  userData: UserInterface;
  observableRef: (node: any) => void;
}

export const PostwittsByUserList = ({
  userData,
  postwitts,
  observableRef,
}: Props) => {
  return (
    <>
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
      <div id="visor" ref={observableRef}></div>
    </>
  );
};
