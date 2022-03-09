import {
  ReactElement,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

const INITIAL_STATE: {
  modalLeftMenuIsOpen: boolean;
  modalNewIsOpen: boolean;
  modalReplyIsOpen: boolean;
  modalConfirmIsOpen: boolean;
  postwittId: string;
} = {
  modalLeftMenuIsOpen: false,
  modalNewIsOpen: false,
  modalReplyIsOpen: false,
  modalConfirmIsOpen: false,
  postwittId: null,
};

export interface PostContextProps {
  // State:
  modalLeftMenuIsOpen: boolean;
  modalNewIsOpen: boolean;
  modalReplyIsOpen: boolean;
  modalConfirmIsOpen?: boolean;
  modalConfirmData?: {
    title?: string;
    description?: string;
    action?: string;
    danger?: boolean;
  };
  postwittId?: string;

  // Methods:
  setPostwittId?: Dispatch<SetStateAction<string>>;
  setModalLeftMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  setModalNewIsOpen: Dispatch<SetStateAction<boolean>>;
  setModalReplyIsOpen: Dispatch<SetStateAction<boolean>>;
  setModalConfirmIsOpen?: Dispatch<SetStateAction<boolean>>;
  setModalConfirmData?: Dispatch<
    SetStateAction<{
      title?: string;
      description?: string;
      action?: string;
      danger?: boolean;
    }>
  >;
}

export const PostContext = createContext({} as PostContextProps);
export const PostProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const [modalLeftMenuIsOpen, setModalLeftMenuIsOpen] = useState(
    INITIAL_STATE.modalLeftMenuIsOpen
  );
  const [modalNewIsOpen, setModalNewIsOpen] = useState(
    INITIAL_STATE.modalNewIsOpen
  );

  const [modalReplyIsOpen, setModalReplyIsOpen] = useState(
    INITIAL_STATE.modalReplyIsOpen
  );
  const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(
    INITIAL_STATE.modalConfirmIsOpen
  );
  const [modalConfirmData, setModalConfirmData] = useState();
  const [postwittId, setPostwittId] = useState<string>(
    INITIAL_STATE.postwittId
  );

  return (
    <PostContext.Provider
      value={{
        // ...state,
        modalLeftMenuIsOpen,
        modalNewIsOpen,
        modalReplyIsOpen,
        modalConfirmIsOpen,
        modalConfirmData,
        postwittId,
        // Methods
        setModalLeftMenuIsOpen,
        setModalReplyIsOpen,
        setModalNewIsOpen,
        setModalConfirmIsOpen,
        setModalConfirmData,
        setPostwittId,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
