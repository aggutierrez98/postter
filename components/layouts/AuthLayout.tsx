import { FC } from "react";
import Head from "next/head";
import Image from "next/image";
import icon from "public/vercel.svg";
import { useTranslation } from "hooks";

interface Props {
  title: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const AuthLayout: FC<Props> = ({ children, title }) => {
  useTranslation();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
        <meta property="og:image" content={`${origin}/banner.jpg`} />
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
