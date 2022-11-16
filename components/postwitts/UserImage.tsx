import { usePopover } from "hooks";
import Image from "next/image";
import { UserPopover } from "components";
import defaultImage from "public/user-template.svg";

export const UserImage = ({ postwitt }) => {
  const { open, onHover } = usePopover();

  return (
    <a
      href={`/users/${postwitt.userId}`}
      className="mr-4 h-[44px]"
      onMouseUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      <Image
        width={44}
        height={44}
        src={postwitt?.userImg ?? defaultImage}
        alt=""
        className="rounded-full hover:opacity-80 transition-all"
      />
      <UserPopover userId={postwitt.userId} open={open} />
    </a>
  );
};
