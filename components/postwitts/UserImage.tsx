import { usePopover } from "hooks";
import Image from "next/image";
import Link from "next/link";
import { UserPopover } from "components";

export const UserImage = ({ postwitt }) => {
  const { open, onHover } = usePopover();

  return (
    <span
      className="mr-4 h-[44px]"
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      <Link href={`/users/${postwitt.userId}`} passHref>
        <a>
          <Image
            width={44}
            height={44}
            src={postwitt?.userImg}
            alt=""
            className="rounded-full hover:opacity-80 transition-all"
          ></Image>
          <UserPopover userId={postwitt.userId} open={open} />
        </a>
      </Link>
    </span>
  );
};
