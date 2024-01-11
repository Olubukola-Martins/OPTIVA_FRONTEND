import { ReactNode, createContext, useContext, useState } from "react";

type GlobalProviderProps = {
  children: ReactNode;
};

type GlobalContext = {
  branchId: number;
  setBranchId: (state: any) => void;
  sharedData: {
    applicantId: number | undefined;
    templateId: number | undefined;
  };
  setSharedData: (data: any) => void;
};

const theGlobalContext = createContext({} as GlobalContext);

export function useGlobalContext() {
  return useContext(theGlobalContext);
}

export function GlobalContextProvider({ children }: GlobalProviderProps) {
  // Define actions here
  const [branchId, setBranchId] = useState<number>(1);
  const [sharedData, setSharedData] = useState({
    applicantId: undefined,
    templateId: undefined,
  });

  return (
    <theGlobalContext.Provider
      value={{ setBranchId, branchId, sharedData, setSharedData }}
    >
      {children}
    </theGlobalContext.Provider>
  );
}
