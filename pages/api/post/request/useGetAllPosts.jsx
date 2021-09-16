import React from "react";
import { useState, useEffect } from "react";

import path from "path";

export default function useGetAllPosts(options = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  let params = Object.assign(
    {},
    {
      orderBy: "DESC",
      limit: 4,
      size: 0,
    },
    options
  );

  const constructPaginatePost = (array) => {
    console.log("caca", array);
    params.size = array.length;

    if (params.size) {
      const numberPage = Math.ceil(array.length / params.limit);
      const sliceArray = [];

      //Sort Post Array

      if (params.orderBy === "DESC") {
        array.sort((a, b) => {
          return b.timestamp - a.timestamp;
        });
      } else {
        array.sort((a, b) => {
          return a.timestamp - b.timestamp;
        });
      }
      //Slice post Array

      let start = 0;
      let end = params.limit;

      for (let index = 0; index < numberPage; index++) {
        //Demarcation of slicing
        index === 0 ? (start = 0) : (start = index * params.limit);
        index === 0 ? (end = params.limit) : (end = (index + 1) * params.limit);
        end > array.length ? (end = array.length) : null;
        sliceArray[index] = array.slice(start, end);
      }

      return sliceArray;
    } else {
      return [];
    }
  };

  useEffect(() => {
    fetch(path.join(process.cwd(), "/api/post"), {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then((res) => {
        console.log("collection", res[0]);
        console.log("getAllPost", res[0].posts);

        setLoading(false);
        setPosts(() => {
          const sliceRes = constructPaginatePost(res[0].posts);
          return sliceRes;
        });
      });
  }, []);

  return [posts, setPosts, loading, params];
}
