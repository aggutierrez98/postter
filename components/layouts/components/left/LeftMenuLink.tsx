import Link from "next/link";
import { ComponentProps, ReactElement } from "react";

interface Props {
  text: string;
  route?: string;
  Icon: (props: ComponentProps<"svg">) => ReactElement;
}

export const LeftMenuLink = ({ Icon, text, route }: Props) => {
  return (
    <Link href={`${route ? route : "/"}`}>
      <a className="text-custom-text hover:font-bold flex items-center  space-x-2 w-full py-[16px] ">
        <Icon className="h-[20px] w-[20px]" />
        <span className="inline text-[15px]">{text}</span>
      </a>
    </Link>
  );
};
