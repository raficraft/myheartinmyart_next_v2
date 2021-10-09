import React, { createContext, useState } from "react";

export const ParamsContext = createContext();

export default function ParamsProvider({ children }) {
  /**
   *
   */
  const [params, setParams] = useState({
    admin: false,
    hamburger: false,
    adminMenu: "home",
    adminSubMenu: false,
    editId: false,
    user: {
      isAuth: true,
    },
    language: "FR",
  });

  return (
    <ParamsContext.Provider value={{ params, setParams }}>
      {children}
    </ParamsContext.Provider>
  );
}
