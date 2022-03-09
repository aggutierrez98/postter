import Link from "next/link";
import { useRouter } from "next/router";
import { ComponentProps, ReactElement } from "react";

interface Props {
  text: string;
  route?: string;
  // eslint-disable-next-line no-unused-vars
  Icon: (props: ComponentProps<"svg">) => ReactElement;
  // eslint-disable-next-line no-unused-vars
  ActiveIcon?: (props: ComponentProps<"svg">) => ReactElement;
}

export const LeftSidebarLink = ({ Icon, text, route, ActiveIcon }: Props) => {
  const router = useRouter();
  const isActualRoute = router.asPath === route;

  return (
    <Link href={`${route ? route : "/"}`}>
      <a
        className={`text-text flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${
          isActualRoute && "font-bold"
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
