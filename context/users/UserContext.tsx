import { ReactElement, createContext, useState } from "react";

export interface UserContextProps {
  modalIsOpen: boolean;
  loadingChanges: boolean;
  modalToLoginIsOpen: boolean;
  modalConfigIsOpen: boolean;
  isLoadingScreen: boolean;
  userId?: string;
  setIsOpen: (value: boolean) => void;
  setUserId?: (value: string) => void;
  setModalConfigIsOpen: (value: boolean) => void;
  setModalToLoginOpen: (value: boolean) => void;
  setLoadingChanges: (value: boolean) => void;
  setIsLoadingScreen: (value: boolean) => void;
}

export const UserContext = createContext({} as UserContextProps);
export const UserProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalToLoginIsOpen, setModalToLoginOpen] = useState(false);
  const [modalConfigIsOpen, setModalConfigIsOpen] = useState(false);
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  const [loadingChanges, setLoadingChanges] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider
      value={{
        // ...state,
        modalIsOpen,
        modalConfigIsOpen,
        modalToLoginIsOpen,
        loadingChanges,
        isLoadingScreen,
        userId,

        // ...setters
        setIsOpen,
        setModalConfigIsOpen,
        setModalToLoginOpen,
        setLoadingChanges,
        setIsLoadingScreen,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
