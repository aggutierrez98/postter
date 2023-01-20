import { Tab } from "@headlessui/react";
import { Fragment, useState } from "react";
import { PostwittsByUserList, TabFilterSelector } from "components";
import { useLoadPostwittsByUser, useNearScreen, useTranslation } from "hooks";

export const TabsShowPostwitts = ({ userData }) => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  const { postwitts, loading, hasMore, loadNextPage, options } =
    useLoadPostwittsByUser({
      userData,
      option: index,
    });
  const { obsRef } = useNearScreen({
    loading,
    loadNextPage,
    hasMore,
  });

  return (
    <section className="pb-72 border-t border-custom-secondary relative">
      <Tab.Group as={Fragment} onChange={setIndex}>
        <Tab.List
          as="hgroup"
          className="border-custom-secondary border-b pb-2 flex justify-between text-custom-placeholder overflow-x-auto"
        >
          {options.map((option) => (
            <Tab as="div" key={option}>
              {({ selected }) => (
                <TabFilterSelector selected={selected} title={t(option)} />
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels as={Fragment}>
          {options.map((option) => (
            <PostwittsByUserList
              key={option}
              userData={userData}
              postwitts={postwitts}
              observableRef={obsRef}
              loading={loading}
            />
          ))}
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
};
