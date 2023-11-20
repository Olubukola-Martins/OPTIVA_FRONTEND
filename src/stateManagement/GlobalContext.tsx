import { ReactNode, createContext, useContext, useState } from "react";

type GlobalProviderProps = {
  children: ReactNode;
};

type GlobalContext = {
  branchId: number;
  setBranchId: (state: any) => void;
};

const theGlobalContext = createContext({} as GlobalContext);

export function useGlobalContext() {
  return useContext(theGlobalContext);
}

export function GlobalContextProvider({ children }: GlobalProviderProps) {
  // Define actions here
  const [branchId, setBranchId] = useState<number>(1);

  return (
    <theGlobalContext.Provider value={{ setBranchId, branchId }}>
      {children}
    </theGlobalContext.Provider>
  );
}
