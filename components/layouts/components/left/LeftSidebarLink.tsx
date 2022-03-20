import Link from "next/link";
import { useRouter } from "next/router";
import { ComponentProps, ReactElement } from "react";

interface Props {
  text: string;
  route?: string;
  Icon: (props: ComponentProps<"svg">) => ReactElement;
  ActiveIcon?: (props: ComponentProps<"svg">) => ReactElement;
}

export const LeftSidebarLink = ({ Icon, text, route, ActiveIcon }: Props) => {
  const router = useRouter();
  const isActualRoute = router.asPath === route;

  return (
    <Link href={`${route ? route : "/"}`}>
      <a
        className={`text-custom-text flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation hover:opacity-100 ${
          isActualRoute ? "font-bold opacity-100" : "opacity-80"
        }`}
      >
        {isActualRoute && ActiveIcon !== undefined ? (
          <ActiveIcon className="h-7" />
        ) : (
          <Icon className="h-7" />
        )}
        <span className="hidden xl:inline">{text}</span>
      </a>
    </Link>
  );
};
