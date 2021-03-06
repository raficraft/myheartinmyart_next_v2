import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import { ParamsContext } from "./../../context/ParamsProvider";
import AdminLeftPanel from "./AdminLeftPanel";

import AdminHome from "./module/home/AdminHome";
import AdminUser from "./module/user/AdminUser";
import AdminBlog from "./module/blog/AdminBlog";
import AdminGallery from "./module/gallery/AdminGallery";
import AdminVideo from "./module/video/AdminVideo";

export default function AdminContainer() {
  const router = useRouter();
  const { params, setParams } = useContext(ParamsContext);

  const adminContainer = () => {
    console.log(params.adminMenu);

    switch (params.adminMenu) {
      case "User":
        return <AdminUser />;
      case "Blog":
        return <AdminBlog />;
      case "Gallery":
        return <AdminGallery />;
      case "Video":
        return <AdminVideo />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="admin_container" data-animate={params.admin}>
      <AdminLeftPanel />
      {adminContainer()}
    </div>
  );
}
