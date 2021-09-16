import React, { useContext } from "react";
import { ParamsContext } from "../../engine/context/ParamsProvider";

export default function Posts() {
  const { params, setParams } = useContext(ParamsContext);

  return (
    <>
      <div>
        <h1>
          Page de post ne contentant que la logique et des composant Enfants
        </h1>
      </div>
    </>
  );
}
