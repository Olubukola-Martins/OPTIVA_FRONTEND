import { ReactNode, createContext, useContext } from "react";

type GlobalProviderProps = {
  children: ReactNode;
};

type GlobalContext = {
  // assign their types here
};

const theGlobalContext = createContext({} as GlobalContext);

export function useGlobalContext() {
  return useContext(theGlobalContext);
}

export function GlobalContextProvider({ children }: GlobalProviderProps) {
  // the main login and states

  return (
    <theGlobalContext.Provider value={{}}>{children}</theGlobalContext.Provider>
  );
}
