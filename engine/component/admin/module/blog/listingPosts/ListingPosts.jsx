import React from "react";
import { InputSearch } from "./../../../../input/inputSearch/InputSearch";
import { debounce, filterData } from "./../../../../../utils/js/tools";

//System Function

export default function ListingPosts(props) {
  const posts = props.posts;

  const filterPost = debounce((e) => {
    console.log("filter", e.target.value);
    const searchValue = e.target.value;
    const res = filterData(posts, searchValue);
    console.log("résultat de la recherche", res);
  }, 300);

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
