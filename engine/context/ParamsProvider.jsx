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
    adminSubMenu: "",
    user: {
      isAuth: true,
    },
  });

  return (
    <ParamsContext.Provider value={{ params, setParams }}>
      {children}
    </ParamsContext.Provider>
  );
}
