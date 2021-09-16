import React, { useContext } from "react";
import { ParamsContext } from "./../../../../context/ParamsProvider";

export default function AdminGallery() {
  const { params, setParams } = useContext(ParamsContext);

  const adminContent = () => {
    switch (params.adminSubMenu) {
      case "addImage":
        return <h1>Form for Add Image</h1>;

      case "manageCategories":
        return <h1>Form for Add and Manage categories</h1>;

      default:
        return <h1>Listing of all Image</h1>;
    }
  };

  return <section className="AdminContent">{adminContent()}</section>;
}
