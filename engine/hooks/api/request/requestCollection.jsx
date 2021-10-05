import React, { useContext, useState, useEffect } from "react";

export function useFetch(url, options) {
  const [state, setState] = useState({
    items: [],
    loading: true,
  });

  useEffect(() => {
    (async () => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        setState({
          items: responseData[0][options.collectionName],
          loading: false,
        });
      } else {
        alert(JSON.stringify(responseData));
        setItem((s) => ({ ...s, loading: false }));
      }
    })();
  }, []);

  return [state.loading, state.items];
}
