import { ReactElement, createContext, useState } from "react";

const INITIAL_STATE: {
  modalIsOpen: boolean;
  userId: string;
} = {
  modalIsOpen: false,
  userId: null,
};

export interface UserContextProps {
  modalIsOpen: boolean;
  userId?: string;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (value: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  setUserId?: (value: string) => void;
}

export const UserContext = createContext({} as UserContextProps);
export const UserProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(INITIAL_STATE.modalIsOpen);
  const [userId, setUserId] = useState<string>(INITIAL_STATE.userId);

  return (
    <UserContext.Provider
      value={{
        // ...state,
        modalIsOpen,
        setIsOpen,
        userId,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
