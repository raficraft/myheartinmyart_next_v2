import React, { useState, useEffect } from "react";
import Loader from "../../../../loader/Loader";
import { InputSearch } from "./../../../../input/inputSearch/InputSearch";

//System Function
import useGetAllPosts from "../../../../../../pages/api/post/request/useGetAllPosts";
import { goToPage } from "./function/function";
import { debounce, filterData } from "./../../../../../utils/js/tools";
import AdminCardListing from "./AdminCardListing";

export default function ListingPosts(props) {
  const [posts, setPosts, loading, setLoading] = useGetAllPosts([], {
    limit: 6,
  });
  const [maxPage, setMaxPage] = useState();
  const [page, setPage] = useState(0);

  useEffect(() => {
    posts.length && setMaxPage(posts.length);
  }, []);

  const createListing = (page) => {
    return posts[page].map((post, key) => {
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

  return loading ? (
    <Loader />
  ) : (
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
      <main className="addPosts_container">
        {posts.length && createListing(page)}
      </main>
      <footer className="paginate_container">
        {posts.length && createPagination(maxPage)}
      </footer>
    </section>
  );
}
