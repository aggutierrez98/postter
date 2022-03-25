import Link from "next/link";
import { useRouter } from "next/router";
import { ComponentProps, ReactElement } from "react";

interface Props {
  text: string;
  route?: string;
  Icon: (props: ComponentProps<"svg">) => ReactElement;
  ActiveIcon?: (props: ComponentProps<"svg">) => ReactElement;
}

export const LeftMenuLink = ({ Icon, text, route, ActiveIcon }: Props) => {
  const router = useRouter();
  const isActualRoute = router.asPath === route;

  return (
    <Link href={`${route ? route : "/"}`}>
      <a
        className={`text-custom-text hover:font-bold flex items-center space-x-2 w-full py-[16px] focus-visible:outline-none 
        focus-visible:font-bold ${
          isActualRoute ? "font-bold opacity-100" : ""
        }`}
      >
        {isActualRoute && ActiveIcon !== undefined ? (
          <ActiveIcon className="h-7" />
        ) : (
          <Icon className="h-7" />
        )}
        <span className="inline text-[15px]">{text}</span>
      </a>
    </Link>
  );
};
