import React, { useContext } from "react";
import { ParamsContext } from "../../engine/context/ParamsProvider";

export default function Posts() {
  const { params, setParams } = useContext(ParamsContext);

  return (
    <>
      <div>
        <h1>
          {params.language === "FR" &&
            "Page de post ne contentant que la logique et des composant Enfants"}
          {params.language === "EN" &&
            "Blog page containing only logic and child components"}
        </h1>
      </div>
    </>
  );
}
