import { createContext, useContext, useState } from "react";
import { NextFormElement, NextFormElementType } from "~/types/NextFormElement";
interface CurrentElementType{
    element: NextFormElement;
    index: number;
}
interface NextFormPropsDefinerType{
  currentElement?:CurrentElementType,
  setCurrentElement: React.Dispatch<React.SetStateAction<CurrentElementType | undefined>>;
}

const NextFormPropsDefiner = createContext<NextFormPropsDefinerType | undefined>(undefined);
export const useNextFormPropsDefiner = () => {
  const context = useContext(NextFormPropsDefiner);
  if (!context) {
    throw new Error("useNextFormPropsDefiner must be used within a NextFormPropsProvider");
  }
  return context;
};

export const NextFormPropsProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentElement, setCurrentElement] = useState<CurrentElementType | undefined>(undefined);
  return (
    <NextFormPropsDefiner.Provider value={{ currentElement ,setCurrentElement }}>
      {children}
    </NextFormPropsDefiner.Provider>
  );
};
