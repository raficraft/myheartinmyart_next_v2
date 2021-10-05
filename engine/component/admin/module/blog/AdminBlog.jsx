import React, { useContext, useState, useEffect } from "react";
import { ParamsContext } from "./../../../../context/ParamsProvider";

import AddPost from "./addPost/AddPost";
import ListingPosts from "./listingPosts/ListingPosts";
import { useFetch } from "./../../../../hooks/api/request/requestCollection";
import CreateCard from "./listingPosts/CreateCard";

export default function AdminBlog(props) {
  const { params, setParams } = useContext(ParamsContext);
  const [adminContent, setAdminContent] = useState();
  //Fetch data
  const [loadingPost, posts] = useFetch("/api/post/", {
    collectionName: "posts",
  });

  useEffect(() => {
    if (!loadingPost) {
      switch (params.adminSubMenu) {
        //Add Page Module
        case "addPost":
          console.log("New id value", posts.length);
          setAdminContent(
            <AddPost
              method="addPost"
              length={posts.length}
              title={"Nouveau billet de blog"}
            />
          );
          break;

        //Edit Post Module
        case "editPost":
          setAdminContent(
            <AddPost
              method="editPost"
              post={params.editData}
              title={"Modification d'un billet de blog"}
            ></AddPost>
          );
          break;

        default:
          //READ post Module
          setAdminContent(
            //Logic de la page
            //Alterate Entries {active,timeStamp}
            //Go to Edit pages

            <ListingPosts
              title="Liste des Billets de Blog"
              key="ListingBlog"
              length={posts.length}
              posts={posts}
            >
              <main className="addPosts_container">
                <CreateCard array={posts} />
              </main>

              <footer className="paginate_container">
                {/*<CreatePaginate array={posts} >*/}
              </footer>
            </ListingPosts>
          );
          break;
      }
    }
  }, [params.adminSubMenu, loadingPost, posts, params.editData]);

  return <>{loadingPost ? <h1>Loading ... !!!!!! :D</h1> : adminContent}</>;
}
