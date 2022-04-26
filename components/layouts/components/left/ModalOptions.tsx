import { Dialog, Listbox, Switch, Transition } from "@headlessui/react";
import { UserContext } from "context";
import { Fragment, useContext } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useToogleTheme, useTranslation } from "hooks";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export const ModalOptions = () => {
  const { setModalConfigIsOpen, modalConfigIsOpen } = useContext(UserContext);
  const { themeState, toogleTheme } = useToogleTheme();
  const { language, changeLang, langOptions, t } = useTranslation();

  {
    langOptions.filter((lang) => {
      if (lang.id === language) {
        return lang.name;
      }
    });
  }

  return (
    <Transition show={modalConfigIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 phone:pt-8 flex phone:items-center justify-center "
        onClose={() => setModalConfigIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-custom-primary phone:bg-[#5b7083] phone:bg-opacity-40"></Dialog.Overlay>
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className="flex flex-col align-bottom bg-custom-primary rounded-2xl text-left phone:shadow-xl 
            transform transition-all phone:my-8 max-w-[550px] phone:h-auto h-screen w-full"
          >
            <div className="flex items-center justify-between px-1.5 py-2 border-b border-custom-secondary">
              <div
                className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                onClick={() => setModalConfigIsOpen(false)}
              >
                <CloseOutlinedIcon className="h-[22px] text-custom-text" />
              </div>
              <div className="text-custom-text font-bold ml-8 text-lg flex-grow">
                {t("settings")}
              </div>
            </div>

            <div className="p-5 text-custom-text text-xs phone:text-base">
              <div className="flex text-custom-text items-center">
                <p>{t("switch theme")}</p>
                <Switch
                  checked={themeState}
                  onChange={toogleTheme}
                  className={`bg-custom-alternative relative inline-flex items-center h-7 rounded-full w-12 ml-5`}
                >
                  <div
                    className={`${
                      themeState ? "translate-x-6" : "translate-x-1 "
                    }  w-5 h-5 transition ease-in-out duration-150 transform rounded-full bg-custom-primary flex items-center justify-center`}
                  >
                    {themeState ? (
                      <DarkModeIcon className="h-4 w-4 p-1 text-custom-alternative" />
                    ) : (
                      <LightModeIcon className="h-4 w-4 p-1 text-custom-alternative" />
                    )}
                  </div>
                </Switch>
              </div>
              <div className="w-full relative flex items-center mt-8">
                <p>{t("select language")}</p>
                <Listbox value={language} onChange={changeLang}>
                  <div className="relative mt-1 ml-5">
                    <Listbox.Button
                      className="relative w-[180px] phone:w-[250px] py-2 pl-3 pr-10 text-left bg-custom-primary rounded-lg shadow-xl cursor-default 
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75  sm:text-sm"
                    >
                      <span className="block truncate">{language?.name}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ExpandMoreIcon
                          className="w-5 h-5 text-custom-text"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options
                        className="absolute w-full py-1 mt-1 overflow-auto text-base bg-custom-primary rounded-md shadow-lg max-h-60 ring-1 
                        ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      >
                        {langOptions.map((lang, langId) => (
                          <Listbox.Option
                            key={langId}
                            className={({ active }) =>
                              `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-custom-alternative bg-[#6285d2] bg-opacity-20"
                                  : "text-custom-text"
                              }`
                            }
                            value={lang}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate text-xs phone:text-base ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {lang.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-custom-alternative">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
