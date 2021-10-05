import { useState, useEffect } from "react";

import path from "path";

export default function useGetAllPosts(initialValue = [], options_ext = {}) {
  const [posts, setPosts] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      // You can await here
      const response = await fetch(path.join(process.cwd(), "/api/post/"), {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      // ...
      const res = await response.json();
      console.log("Request result ", res);
      console.log("allPost ", res[0].posts);

      if (response.ok) {
        setLoading(false);
        setPosts(() => {
          const sliceRes = constructPaginatePost(res[0].posts);
          return sliceRes;
        });
      } else {
        console.log("res error : ", res);
        res.send(JSON.stringify(res));
      }
    })();
  }, []);

  return [posts, setPosts, loading, setLoading, options];
}
