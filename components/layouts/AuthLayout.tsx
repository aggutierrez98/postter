import { FC } from "react";
import Head from "next/head";
import Image from "next/image";
import icon from "public/vercel.svg";

interface Props {
  title: string;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <div className="flex justify-center flex-col items-center sm:h-screen">
          <Image src={icon} width={150} height={150} objectFit="contain" />
          {children}
        </div>
      </main>
    </>
  );
};
