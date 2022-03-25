import { FC } from "react";
import Head from "next/head";
import Image from "next/image";
import icon from "public/post.png";
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
          <div className="flex items-center mb-6 phone:mb-10 mt-6 phone:mt-10">
            <div className="h-[65px] w-[65px] sm:h-[80px] sm:w-[80px] md:h-[100px] md:w-[100px] relative">
              <Image src={icon} layout="fill" objectFit="contain" />
            </div>
            <h1 className="text-[50px] sm:text-[80px] ml-3 text-[#1d9bf0]">
              Postter
            </h1>
          </div>
          {children}
        </div>
      </main>
    </>
  );
};
