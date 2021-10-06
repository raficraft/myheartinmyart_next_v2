import React, { useEffect, useState } from "react";

import path from "path";

export default function useFindPostById(id) {
  console.log("NEw HooKs : ", id);

  const [currentPost, setCurrentPost] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const getAllPosts = await fetch(
        path.join(process.cwd(), `/api/post/${id}`),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      // ...
      const res = await getAllPosts.json();
      console.log("Post result : ", res);

      setLoading(false);
      setCurrentPost(() => {
        return res[0];
      });
    }
    fetchData();
    console.log(currentPost);
  }, []);

  console.log(currentPost);
  return [currentPost, setCurrentPost, loading];
}
