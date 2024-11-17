import React, { createContext, useContext, useState, ReactNode } from "react";
import { NextFormElement } from "~/types/NextFormElement";
interface NextFormContextType{
  nextFormElements: NextFormElement[];
  setNextFormElements: React.Dispatch<React.SetStateAction<NextFormElement[]>>;
}
const NextFormContext = createContext<NextFormContextType | undefined>(undefined);
export const useNextFormContext = () => {
  const context = useContext(NextFormContext);
  if (!context) {
    throw new Error("useNextFormContext must be used within a NextFormProvider");
  }
  return context;
};
export const NextFormProvider = ({ children }: { children: ReactNode }) => {
  const [nextFormElements, setNextFormElements] = useState<NextFormElement[]>([]);

  return (
    <NextFormContext.Provider value={{ nextFormElements, setNextFormElements }}>
      {children}
    </NextFormContext.Provider>
  );
};
