import { Combobox, Transition } from "@headlessui/react";
import { getHashtagsByName } from "@f/index";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useTranslation } from "hooks";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
export const SearchBar = () => {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [selected, setSelected] = useState(null);
  const router = useRouter();

  const changeSelected = (hashtagValue: string) => {
    router.push(`/explore/${hashtagValue}`);
    setSelected(hashtagValue);
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (inputText.length > 0) {
        getHashtagsByName(inputText.toLowerCase()).then((hashtagResults) => {
          setHashtags(hashtagResults);
        });
      }
    }, 200);

    return () => clearTimeout(delay);
  }, [inputText]);

  return (
    <div className="top-0 bg-custom-primary z-50 flex items-center h-[52px] opacity-95 sticky w-full">
      <div className="flex items-center justify-start bg-custom-secondary rounded-full relative h-[42px] w-full">
        <Combobox value={selected} onChange={changeSelected} as={Fragment}>
          <SearchOutlinedIcon className="absolute text-custom-terciary h-[24px] w-[24px] ml-4 z-20" />
          <Combobox.Input
            onChange={handleInputChange}
            type="text"
            className="relative h-full bg-transparent placeholder-custom-placeholder outline-none text-custom-text inset-0 pl-12 border
              border-transparent w-full focus:border-custom-terciary rounded-full focus:bg-background focus:shadow-lg"
            placeholder={t("search on postter")}
            value={inputText}
            autoComplete="off"
          />
          <Transition
            as="div"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {inputText !== "" && (
              <Combobox.Options
                className="shadow-mh absolute left-0 top-12 ml-1 w-[97.5%] py-1 mt-1 overflow-auto text-base bg-custom-primary max-h-60 ring-1 ring-custom-secondary
                  rounded-md ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {hashtags.length === 0 ? (
                  <div className="cursor-default select-none relative py-2 px-4 text-custom-alternative text-[15px]">
                    {t("nothing_found")}
                  </div>
                ) : (
                  hashtags.map((hashtag) => (
                    <Link
                      key={hashtag.hashtag}
                      href={`/explore/${hashtag.hashtag}`}
                      passHref
                    >
                      <a>
                        <Combobox.Option
                          className={({ active }) =>
                            `cursor-pointer select-none relative py-2 pl-5 pr-4 ${
                              active
                                ? "text-custom-text bg-custom-alternative"
                                : "text-custom-text"
                            }`
                          }
                          value={hashtag.hashtag}
                        >
                          {() => (
                            <>
                              <div className="flex justify-between">
                                <p className="truncate ">{hashtag.hashtag}</p>
                                <p>{hashtag.postwitts}</p>
                              </div>
                            </>
                          )}
                        </Combobox.Option>
                      </a>
                    </Link>
                  ))
                )}
              </Combobox.Options>
            )}
          </Transition>
        </Combobox>
      </div>
    </div>
  );
};
