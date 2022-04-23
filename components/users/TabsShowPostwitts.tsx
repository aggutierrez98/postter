import { Tab } from "@headlessui/react";
import { Fragment, useState } from "react";
import { PostwittsByUserList, TabFilterSelector } from "components";
import { useLoadPostwittsByUser, useNearScreen, useTranslation } from "hooks";
import { LoadingPostwitts } from "components";

export const TabsShowPostwitts = ({ userData }) => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  const { postwitts, loading, hasMore, loadNextPage } = useLoadPostwittsByUser({
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
          <Tab as="div">
            {({ selected }) => (
              <TabFilterSelector selected={selected} title="Postwitts" />
            )}
          </Tab>
          <Tab as="div">
            {({ selected }) => (
              <TabFilterSelector
                selected={selected}
                title={t("postwitts and answers")}
              />
            )}
          </Tab>
          <Tab as="div">
            {({ selected }) => (
              <TabFilterSelector selected={selected} title={t("media")} />
            )}
          </Tab>
          <Tab as="div">
            {({ selected }) => (
              <TabFilterSelector selected={selected} title={t("likes")} />
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels as={Fragment}>
          <Tab.Panel as={Fragment}>
            <>
              {postwitts.length > 0 && (
                <PostwittsByUserList
                  userData={userData}
                  postwitts={postwitts}
                  observableRef={obsRef}
                />
              )}
              {loading && <LoadingPostwitts />}
            </>
          </Tab.Panel>
          <Tab.Panel as={Fragment}>
            <>
              {postwitts.length > 0 && (
                <PostwittsByUserList
                  userData={userData}
                  postwitts={postwitts}
                  observableRef={obsRef}
                />
              )}
              {loading && <LoadingPostwitts />}
            </>
          </Tab.Panel>
          <Tab.Panel as={Fragment}>
            <>
              {postwitts.length > 0 && (
                <PostwittsByUserList
                  userData={userData}
                  postwitts={postwitts}
                  observableRef={obsRef}
                />
              )}
              {loading && <LoadingPostwitts />}
            </>
          </Tab.Panel>
          <Tab.Panel as={Fragment}>
            <>
              {postwitts.length > 0 && (
                <PostwittsByUserList
                  userData={userData}
                  postwitts={postwitts}
                  observableRef={obsRef}
                />
              )}
              {loading && <LoadingPostwitts />}
            </>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
};
