import React, { createContext, useState } from "react";

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  console.log(props);
  const [pendingRequests, setPendingRequest] = useState(0);

  return (
    <LoadingContext.Provider value={[pendingRequests, setPendingRequest]}>
      {children}
    </LoadingContext.Provider>
  );
}
