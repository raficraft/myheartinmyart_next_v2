import React, { useContext, useState, useEffect } from "react";
import { ParamsContext } from "./../../../../context/ParamsProvider";

import AddPost from "./addPost/AddPost";
import ListingPosts from "./listingPosts/ListingPosts";

export default function AdminBlog() {
  const { params, setParams } = useContext(ParamsContext);
  const [adminContent, setAdminContent] = useState();

  useEffect(() => {
    switch (params.adminSubMenu) {
      case "addPost":
        setAdminContent(
          <AddPost title="Nouveau billet de blog" method="addPost" />
        );
        break;

      case "editPost":
        setAdminContent(
          <AddPost
            title="Modification d'un billet de blog"
            method="editPost"
            post={params.editData}
          />
        );
        break;

      default:
        setAdminContent(
          <ListingPosts title="Liste des Billets de Blog" key="ListingBlog" />
        );
        break;
    }
  }, [params.adminSubMenu, params.editId]);

  /* const adminContent = () => {
  
  };*/

  return <>{adminContent}</>;
}
