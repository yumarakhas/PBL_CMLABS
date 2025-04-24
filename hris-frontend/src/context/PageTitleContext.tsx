"use client";
import { createContext, useContext, useState } from "react";

const PageTitleContext = createContext({
  title: "",
  setTitle: (title: string) => {},
});

export function PageTitleProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState("Dashboard");
  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
}

export const usePageTitle = () => useContext(PageTitleContext);
