import React, { useContext, useState, useEffect } from "react";
import { ParamsContext } from "./../../../../context/ParamsProvider";

import AddPost from "./addPost/AddPost";
import ListingPosts from "./listingPosts/ListingPosts";
import { useFetch } from "./../../../../hooks/api/request/requestCollection";
import CreateCard from "./listingPosts/CreateCard";
import { FaTrashAlt } from "react-icons/fa";

export default function AdminBlog(props) {
  const { params, setParams } = useContext(ParamsContext);
  const [adminContent, setAdminContent] = useState();
  const [showPost, setShowPost] = useState(true);
  //Fetch data
  const [loadingPost, posts, setPosts] = useFetch("/api/post/", {
    collectionName: "posts",
  });

  console.log("POSTS ON_LOAD : ", posts.length);

  useEffect(() => {
    if (!loadingPost) {
      switch (params.adminSubMenu) {
        //Add Page Module
        case "addPost":
          console.log("New id value", posts.length);
          setAdminContent(
            <AddPost
              length={posts.length}
              title={"Nouveau billet de blog"}
              setParams={setParams}
              setPosts={setPosts}
            />
          );
          break;

        //Edit Post Module
        case "editPost":
          if (params.editId) {
            setAdminContent(
              <AddPost
                post={posts[params.editId]}
                title={"Modification d'un billet de blog"}
                setPosts={setPosts}
                setParams={setParams}
              ></AddPost>
            );
          } else {
            alert("params editId undefined");
          }

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
            console.log(params);

            const bodyRequest = {
              action: params.action,
              fields: params.fields,
              value: params.value,
              postId: params.postId,
            };

            fetch(`/api/post/${params.postId}`, {
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
                setPosts({ items: result.newPosts });
                console.log(posts);
              });
          };

          const showTrash = () => {
            console.log("click");
            console.log("init", showPost);
            const newVal = showPost === "trash" ? true : "trash";
            setShowPost(newVal);
            console.log("new : ", showPost);
            return "yolo";
          };

          const delPost = (e, params) => {
            console.log("delPost");
            fetch(`/api/post/${params.postId}`, {
              method: "DELETE",
            })
              .then((r) => r.json())
              .then((result) => {
                console.log("Request API , suppression article", result);
                setPosts({ items: result.newPosts });
                console.log(posts);
              });
          };

          setAdminContent(
            <ListingPosts
              title={
                showPost === "trash"
                  ? "Billets de blog Supprimé"
                  : "Liste des Billets de Blog"
              }
              key="ListingBlog"
              length={posts.length}
              posts={posts}
            >
              <main className="addPosts_container">
                <CreateCard
                  array={posts}
                  showEditModule={showEditModule}
                  putPost={putPost}
                  filterBy={showPost}
                  delPost={delPost}
                />
                <button className="trashPost" onClick={showTrash}>
                  <FaTrashAlt />
                </button>
              </main>

              <footer className="paginate_container">
                {/*<CreatePaginate array={posts} >*/}
              </footer>
            </ListingPosts>
          );
          break;
      }
    }
  }, [params.adminSubMenu, loadingPost, posts, params.editData, showPost]);

  return <>{loadingPost ? <h1>Loading ... !!!!!! :D</h1> : adminContent}</>;
}
