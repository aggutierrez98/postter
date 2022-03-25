import { Transition } from "@headlessui/react";
import Image from "next/image";

export const LoadingPostwitts = () => {
  return (
    <Transition
      show={true}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <span className=" flex w-full items-center justify-center h-20">
        <Image
          width={40}
          height={40}
          className="fixed animate-spin loading__image-blue"
          id="load_image"
          src={"/loading.png"}
          alt="loading"
        />
      </span>
    </Transition>
  );
};
