"use client";
import React from "react";

export const UserContext = React.createContext<{ token: string | undefined }>({
  token: undefined,
});

export const UserProvider = ({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string | undefined;
}) => {
  return (
    <UserContext.Provider value={{ token }}>{children}</UserContext.Provider>
  );
};
