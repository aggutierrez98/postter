import { UserContext } from "context";
import Image from "next/image";
import { useContext } from "react";

export const LoadingCircle = () => {
  const { loadingChanges } = useContext(UserContext);

  return (
    <>
      {loadingChanges && (
        <span className="fixed left-[60px] bottom-[60px]">
          <Image
            width={80}
            height={80}
            className="fixed animate-spin loading__image-purple"
            id="load_image"
            src={"/loading.png"}
            alt="loading"
          />
        </span>
      )}
    </>
  );
};
