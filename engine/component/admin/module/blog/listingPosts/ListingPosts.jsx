import React, { useState, useEffect } from "react";
import Loader from "../../../../loader/Loader";
import { InputSearch } from "./../../../../input/inputSearch/InputSearch";

//System Function
import useGetAllPosts from "../../../../../../pages/api/post/request/useGetAllPosts";
import { goToPage } from "./function/function";
import { debounce, filterData } from "./../../../../../utils/js/tools";
import AdminCardListing from "./AdminCardListing";



export default function ListingPosts(props) {
  const posts = props.posts;
  const [maxPage, setMaxPage] = useState();
  const [page, setPage] = useState(0);

  //paGination du tableau

  useEffect(() => {
    //setPosts(constructPaginatePost(posts, { limit: 6 }));
    posts.length && setMaxPage(props.length);
  }, []);

  const createListing = (array, page) => {
    console.log("outset", array[page]);
    return array.map((post, key) => {
      if (typeof post.activate === "boolean") {
        return <AdminCardListing key={`card_${key}`} {...post} />;
      } else {
        return;
      }
    });
  };

  const filterPost = debounce((e) => {
    console.log("filter", e.target.value);
    const searchValue = e.target.value;
    const res = filterData(posts, searchValue);
    console.log("résultat de la recherche", res);
  }, 300);

  const createPagination = (pageNumber) => {
    const paginate = [];
    for (let index = 0; index < pageNumber; index++) {
      let pageNumber = index + 1;
      paginate.push(
        <button
          onClick={(e) => {
            goToPage(e, index, setPage);
          }}
          key={`btn_paginate_${index}`}
        >
          {pageNumber}
        </button>
      );
    }
    return paginate;
  };

  return (
    <section className="adminContent adminContent-addPosts">
      <header>
        <h1>{props.title}</h1>
        <InputSearch
          attr={{
            label: "",
            forHtml: "search",
            type: "search",
            placeholder: "Rechercher un article",
          }}
          filterData={props.filterPost}
        />
      </header>
      <div>Système de filtre (on-work)</div>
      <hr></hr>
      {props.children}
    </section>
  );
}
