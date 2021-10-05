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
          //Logic de la page
          //Alterate Entries {active,timeStamp}
          //Go to Edit pages
          console.log("props admincardlisting", props);

          const showEditModule = (postId) => {
            console.log("click");
            console.log(props.id);
            const newContext = { adminSubMenu: "editPost", editData: props };
            setParams(Object.assign({}, params, newContext));
          };

          const putPost = (e, params) => {
            const postId = props.id;

            const bodyRequest = {
              action: params.action,
              fields: params.fields,
              value: params.value,
              postId,
            };

            fetch(`/api/post/${postId}`, {
              method: "PUT",
              body: JSON.stringify(bodyRequest),
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            })
              .then((r) => r.json())
              .then((result) => {
                console.log("Request API", result);
              });
          };

          setAdminContent(
            <ListingPosts
              title="Liste des Billets de Blog"
              key="ListingBlog"
              length={posts.length}
              posts={posts}
            >
              <main className="addPosts_container">
                <CreateCard
                  array={posts}
                  showEditModule={showEditModule}
                  putPost={putPost}
                />
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
