import React, { useEffect, useState, useRef } from "react";
import { InputBloc } from "../../../../input/inputBloc/InputBloc";
import { Tabs } from "./../../../../menu/tabSystem/Tabs";
import Tab from "./../../../../menu/tabSystem/Tab";
import useFindPostById from "./../../../../../../pages/api/post/request/useFindPostById";
import { debounce } from "./../../../../../utils/js/tools";
import blogPreview from "../../../../../utils/js/blogPreview/blogPreview";

export default function EditPost(props) {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log(props);
  const [currentPost, setCurrentPost, loading] = useFindPostById(props.postId);

  useEffect(() => {
    console.log("currentPost :", currentPost);
  }, [loading]);

  const maxFileSize = 5000000;
  const authFormat = ["jpeg", "png", "bmp", "tiff"];

  const newPostRef = {
    userID: useRef(),
    titleFR: useRef(),
    contentFR: useRef(),
    titleEN: useRef(),
    contentEN: useRef(),
    date: useRef(),
    hours: useRef(),
    minutes: useRef(),
    file: useRef(),
    active: useRef(),
    alt_FR: useRef(),
    alt_EN: useRef(),
  };

  const canvasRef = {
    resize_axeX: useRef(false),
    resize_axeY: useRef(false),
    canvas: useRef(),
    source: useRef(),
  };
  const [inputRange, setInputRange] = useState({
    x: 0,
    y: 0,
  });

  const handleChange_Axis = (e, axis) => {
    if (axis === "x") {
      setInputRange({ x: e.target.value });
    } else {
      setInputRange({ y: e.target.value });
    }
  };

  const [newID, setNewID] = useState({});
  const [imageUpload, setImageUpload] = useState({
    imageBase64: "",
    imageName: "",
    width: 0,
    height: 0,
    fileName: "",
  });

  const [canvasPreview, setCanvasPreview] = useState({
    width: 0,
    height: 0,
  });
  const [canvasOutput, setCanvasOutput] = useState({
    width: 0,
    height: 0,
  });

  const uploadToClient = debounce((e) => {
    const file = newPostRef.file.current.files[0];
    const fileType = file.type.split("/")[1];

    if (e.target.name === "postImage") {
      setInputRange({ x: 0, y: 0 });
    }

    if (file && file.size < maxFileSize && authFormat.includes(fileType)) {
      const uploadImage = newPostRef.file.current.files[0];
      blogPreview(uploadImage, canvasRef, setImageUpload);

      setCanvasPreview({
        width: canvasRef.source.current.clientWidth,
        height: canvasRef.source.current.clientHeight,
      });

      setCanvasOutput({
        width: canvasRef.canvas.current.width,
        height: canvasRef.canvas.current.height,
      });
    } else {
      e.target.value = null;
      alert(
        "Fichier trop volumineux 5mo max ou au mauvais format [jpeg,png,bmp,tiff]"
      );
    }
  }, 300);

  //Reset form
  const handleCancel = () => {
    console.log("cancel");
  };

  return loading ? (
    <h1>Loading ....</h1>
  ) : (
    <section className="adminContent adminContent-addBlog">
      <header>
        <h1>{props.title}</h1>
      </header>
      <hr></hr>
      <main className="form form_container-addPost">
        <form className="form_addPost">
          <Tabs key="tabs_addBlog">
            <Tab title="Publication en FR" key="form_fr">
              <InputBloc
                attr={{
                  type: "text",
                  label: "Titre de la publication",
                  forhtml: "title_fr",
                  placeholder: "Saisir le titre de la publication",
                  required: "required",
                }}
                format="alphanumeric"
                ref={newPostRef.titleFR}
                defaultValue={currentPost ? currentPost.fr.title : ""}
              />
              <hr></hr>
              <InputBloc
                attr={{
                  type: "textarea",
                  label: "Contenu de la publication",
                  forhtml: "content_fr",
                  placeholder: "Contenu de la publication",
                  wrap: "soft",
                  required: "required",
                }}
                ref={newPostRef.contentFR}
                format="alphanumeric"
              />
            </Tab>
            <Tab title="Publication en EN" key="form_en">
              <InputBloc
                attr={{
                  type: "text",
                  label: "Titre de la publication",
                  forhtml: "title_en",
                  placeholder: "Saisir le titre de la publication",
                  wrap: "soft",
                  required: "required",
                }}
                ref={newPostRef.titleEN}
                format="alphanumeric"
              />
              <hr></hr>
              <InputBloc
                attr={{
                  type: "textarea",
                  label: "Contenu de la publication",
                  forhtml: "content_en",
                  placeholder: "Contenu de la publication",
                  required: "required",
                }}
                ref={newPostRef.contentEN}
                format="alphanumeric"
              />
            </Tab>
            <Tab title="Image d'acceuil" key="form_image">
              <section className="form_previewImage">
                <div className="form_previewImage-source">
                  <p>Image Original</p>
                  <canvas
                    ref={canvasRef.source}
                    id="imgSrc"
                    width={`${canvasPreview.width}px`}
                    height={`${canvasPreview.height}px`}
                  />

                  <p>Image de sortie</p>
                  <canvas
                    width="450px"
                    height="300px"
                    id="myCanvas"
                    style={{ border: "1px solid black" }}
                    ref={canvasRef.canvas}
                  />
                </div>

                <div className="form_previewImage-resizeControl">
                  <div className="inputBloc inpuBloc-file inputBloc-post image">
                    <label htmlFor="postImage">{`Contenu de l'article : `}</label>
                    <input
                      type="file"
                      name="postImage"
                      id="postImage"
                      ref={newPostRef.file}
                      onChange={uploadToClient}
                      required="required"
                    />
                  </div>

                  <InputBloc
                    attr={{
                      type: "textarea",
                      label: "Description de l'image",
                      forhtml: "alt_FR",
                      placeholder: "Description de l'image en FR",
                      rows: "3",
                      spellCheck: "true",
                      required: "required",
                    }}
                    ref={newPostRef.alt_FR}
                    format="alphanumeric"
                  />

                  <InputBloc
                    attr={{
                      type: "textarea",
                      label: "Image description",
                      forhtml: "alt_EN",
                      placeholder: "Image description to EN",
                      rows: "3",
                      spellCheck: true,
                      required: "required",
                    }}
                    ref={newPostRef.alt_EN}
                    format="alphanumeric"
                  />
                  {imageUpload.width - canvasOutput.width > 0 && (
                    <InputBloc
                      attr={{
                        type: "range",
                        label: "Axe X",
                        forhtml: "axeX",
                        min: 0,
                        max: imageUpload.width - canvasOutput.width,
                        step: 1,
                        onMouseUp: uploadToClient,
                        onChange: (e) => handleChange_Axis(e, "x"),
                        value: inputRange.x,
                      }}
                      ref={canvasRef.resize_axeX}
                    />
                  )}

                  {imageUpload.height - canvasOutput.height > 0 && (
                    <InputBloc
                      attr={{
                        type: "range",
                        label: "Axe Y",
                        forhtml: "axeY",
                        min: 0,
                        max: imageUpload.height - canvasOutput.height,
                        step: 1,
                        onMouseUp: uploadToClient,
                        onChange: (e) => handleChange_Axis(e, "y"),
                        value: inputRange.y,
                        required: "required",
                      }}
                      ref={canvasRef.resize_axeY}
                      controled="false"
                    />
                  )}
                </div>
              </section>
            </Tab>
          </Tabs>
        </form>
      </main>
    </section>
  );
}
