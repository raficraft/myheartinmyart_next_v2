import React from "react";
import { useState, useEffect } from "react";

import path from "path";
import { addListener } from "process";

export default function useGetAllPosts(initialValue = [], options_ext = {}) {
  const [posts, setPosts] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  let options = Object.assign(
    {},
    {
      paginate: true,
      orderBy: "DESC",
      limit: 0,
      size: 0,
    },
    options_ext
  );

  const constructPaginatePost = (array) => {
    options.size = array.length;
    const sliceArray = [];

    if (options.size && options.size > options.limit) {
      const numberPage = !options.paginate
        ? 0
        : Math.ceil(array.length / options.limit);

      //Sort Post Array

      if (options.orderBy === "DESC") {
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
      let end = options.limit;

      for (let index = 0; index <= numberPage; index++) {
        //Demarcation of slicing
        if (options.paginate) {
          index === 0 ? (start = 0) : (start = index * options.limit);
          index === 0
            ? (end = options.limit)
            : (end = (index + 1) * options.limit);
          end > array.length ? (end = array.length) : null;
          sliceArray[index] = array.slice(start, end);
        } else {
          sliceArray[index] = array.slice(start, options.size);
        }
      }

      return sliceArray;
    } else {
      sliceArray[0] = array.slice(0, options.size);
      return sliceArray;
    }
  };

  useEffect(() => {
    (async function () {
      // You can await here
      const response = await fetch(path.join(process.cwd(), "/api/post"), {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      // ...
      const res = await response.json();
      console.log("allPost ", res[0].posts);

      if (response.ok) {
        setLoading(false);
        setPosts(() => {
          const sliceRes = constructPaginatePost(res[0].posts);
          return sliceRes;
        });
      } else {
        addListener(JSON.stringify(res));
      }
    })();
  }, []);

  return [posts, setPosts, loading, setLoading, options];
}
