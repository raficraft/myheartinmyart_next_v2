import React, { useContext } from "react";
import { ParamsContext } from "./../../../../context/ParamsProvider";

export default function AdminVideo() {
  const { params, setParams } = useContext(ParamsContext);

  const adminContent = () => {
    switch (params.adminSubMenu) {
      case "addVideo":
        return <h1>Form for Add Vidéo</h1>;

      default:
        return <h1>Listing of all Video</h1>;
    }
  };

  return <section className="AdminContent">{adminContent()}</section>;
}
