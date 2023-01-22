import { Tab } from "@headlessui/react";
import { Postwitt } from "components";
import { useTranslation } from "hooks";
import { UserInterface } from "interfaces";
import { LoadingPostwitts } from "../layouts/components/LoadingPostwitts";

interface Props {
  postwitts?: any[];
  userData: UserInterface;
  observableRef: (node: any) => void;
  loading: boolean;
}

export const PostwittsByUserList = ({
  userData,
  postwitts,
  observableRef,
  loading,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Tab.Panel className="focus-visible:outline-none">
      {!loading ? (
        postwitts.length > 0 ? (
          postwitts.map((postwitt) => (
            <Postwitt
              key={postwitt.id}
              postwittId={postwitt.id}
              postwitt={postwitt}
              pinned={postwitt.id === userData.pinned}
              repostedBy={postwitt.repostedBy}
              idOriginal={postwitt.idOriginal}
              timePostedOriginal={postwitt.timePostedOriginal}
            />
          ))
        ) : (
          <section className="flex items-center justify-center flex-col h-[150px] w-full ">
            <h2 className="text-xl bg-custom-alternative px-8 py-4 text-custom-primary rounded-[10px]">
              {t("no_postwitts_already")}
            </h2>
          </section>
        )
      ) : (
        <LoadingPostwitts />
      )}
      <div id="visor" ref={observableRef}></div>
    </Tab.Panel>
  );
};
