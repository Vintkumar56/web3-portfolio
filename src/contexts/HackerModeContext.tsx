"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface HackerModeContextType {
  hackerMode: boolean;
  toggleHackerMode: () => void;
}

const HackerModeContext = createContext<HackerModeContextType | undefined>(undefined);

export function HackerModeProvider({ children }: { children: ReactNode }) {
  const [hackerMode, setHackerMode] = useState(false);

  const toggleHackerMode = () => {
    setHackerMode(!hackerMode);
  };

  return (
    <HackerModeContext.Provider value={{ hackerMode, toggleHackerMode }}>
      {children}
    </HackerModeContext.Provider>
  );
}

export function useHackerMode() {
  const context = useContext(HackerModeContext);
  if (context === undefined) {
    throw new Error("useHackerMode must be used within a HackerModeProvider");
  }
  return context;
}
