"use client";

import React, { createContext, useContext } from "react";

interface DashboardContextType {
  onMenuClick: () => void;
}

const DashboardContext = createContext<DashboardContextType>({
  onMenuClick: () => {},
});

export function useDashboard() {
  return useContext(DashboardContext);
}

export function DashboardProvider({
  children,
  onMenuClick,
}: {
  children: React.ReactNode;
  onMenuClick: () => void;
}) {
  return (
    <DashboardContext.Provider value={{ onMenuClick }}>
      {children}
    </DashboardContext.Provider>
  );
}
