import React, { useContext } from "react";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { PostContext } from "context";

interface Props {
  isHome?: boolean;
  title: string;
  tagText?: string;
}

export const Header = ({ title, tagText, isHome = false }: Props) => {
  const router = useRouter();
  const { setModalLeftMenuIsOpen } = useContext(PostContext);

  return (
    <header
      className="flex items-center px-1.5 py-2 border-b border-custom-secondary text-custom-text font-semibold 
        text-xl gap-x-4 top-0 z-50 bg-custom-primary sticky"
    >
      {isHome ? (
        <span className="phone:hidden xl:mr-2.5">
          <button
            className="hoverAnimation h-10 w-10 flex justify-center items-center"
            onClick={() => setModalLeftMenuIsOpen(true)}
          >
            <MenuIcon className="h-7 w-7" />
          </button>
        </span>
      ) : (
        <div
          className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowBackIcon className="h-5 text-custom-text" />
        </div>
      )}
      <div className={`flex flex-col ${isHome ? "ml-2 phone:ml-5" : ""}`}>
        {title}
        {tagText && (
          <span className="text-custom-placeholder text-sm leading-[8px] mb-1">
            @{tagText}
          </span>
        )}
      </div>
      <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
        <AutoAwesomeOutlinedIcon className="h-5 text-custom-text" />
      </div>
    </header>
  );
};
