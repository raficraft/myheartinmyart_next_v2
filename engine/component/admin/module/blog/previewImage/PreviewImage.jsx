import React from "react";

export default function previewImage(props) {
  return (
    <div className="previewImage">
      <canvas
        width="300px"
        height="300px"
        id="myCanvas"
        style={{ border: "1px solid black" }}
        ref={props.refImage}
      />

      <div className="bloc_input-admin">
        <label htmlFor="postImage">{`Contenu de l'article : `}</label>
        <input
          type="file"
          name="postImage"
          id="postImage"
          ref={props.refCanvas}
        />
      </div>
    </div>
  );
}
