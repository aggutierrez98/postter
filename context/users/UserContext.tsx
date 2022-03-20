import { ReactElement, createContext, useState } from "react";

export interface UserContextProps {
  modalIsOpen: boolean;
  loadingChanges: boolean;
  modalConfigIsOpen: boolean;
  userId?: string;
  setIsOpen: (value: boolean) => void;
  setLoadingChanges: (value: boolean) => void;
  setUserId?: (value: string) => void;
  setModalConfigIsOpen: (value: boolean) => void;
}

export const UserContext = createContext({} as UserContextProps);
export const UserProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalConfigIsOpen, setModalConfigIsOpen] = useState(false);
  const [loadingChanges, setLoadingChanges] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider
      value={{
        // ...state,
        modalIsOpen,
        modalConfigIsOpen,
        loadingChanges,
        setIsOpen,
        setModalConfigIsOpen,
        setLoadingChanges,
        userId,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
