import { Transition } from "@headlessui/react";
import { UserContext } from "context";
import { useContext } from "react";

export const LoadingScreen = () => {
  const { isLoadingScreen } = useContext(UserContext);

  return (
    <Transition
      show={isLoadingScreen}
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed inset-0 bg-[#5b7083] bg-opacity-30 z-[55]"
    >
      <div className="absolute left-[50%] top-[50%] -translate-x-2/4 -translate-y-2/4">
        <span className="loader" />
      </div>
    </Transition>
  );
};
