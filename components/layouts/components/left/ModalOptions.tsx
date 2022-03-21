import { Dialog, Listbox, Switch, Transition } from "@headlessui/react";
import { UserContext } from "context";
import { Fragment, useContext } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useToogleTheme, useTranslation } from "hooks";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    <Transition
      as="div"
      show={modalConfigIsOpen}
      enter="ease duration-1500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed z-50 inset-0 phone:pt-8 flex phone:items-center justify-center "
    >
      <Dialog
        as="div"
        className="fixed z-50 inset-0 phone:pt-8 flex phone:items-center justify-center "
        onClose={() => setModalConfigIsOpen(false)}
      >
        <Dialog.Overlay className="fixed inset-0 bg-custom-primary phone:bg-[#5b7083] phone:bg-opacity-40 transition-opacity">
          {/* <LoadingCircle /> */}
        </Dialog.Overlay>
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

          <div className="p-5 text-custom-text">
            <div className="flex text-custom-text">
              <p>{t("switch")}</p>
              <Switch
                checked={themeState}
                onChange={toogleTheme}
                className={`bg-custom-alternative relative inline-flex items-center h-6 rounded-full w-11 ml-5`}
              >
                <span
                  className={`${
                    themeState ? "translate-x-6" : "translate-x-1 "
                  } inline-block w-4 h-4 transform rounded-full bg-custom-primary`}
                />
              </Switch>
            </div>
            <div className="w-full relative flex items-center mt-8">
              <p>{t("select language")}</p>
              <Listbox value={language} onChange={changeLang}>
                <div className="relative mt-1 ml-5">
                  <Listbox.Button
                    className="relative w-[250px] py-2 pl-3 pr-10 text-left bg-custom-primary rounded-lg shadow-xl cursor-default 
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
                      className="absolute w-full py-1 mt-1 overflow-auto text-base bg-custom-primary rounded-md shadow-lg max-h-60 ring-1 ç
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
                                className={`block truncate ${
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
      </Dialog>
    </Transition>
  );
};
