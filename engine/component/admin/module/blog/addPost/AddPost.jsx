import React, { useState, useRef, useEffect, useContext } from "react";
import { InputBloc } from "../../../../input/inputBloc/InputBloc";
import { Tabs } from "./../../../../menu/tabSystem/Tabs";
import Tab from "./../../../../menu/tabSystem/Tab";
import blogPreview from "../../../../../utils/js/blogPreview/blogPreview";
import { debounce, getDateByTimeStamp } from "../../../../../utils/js/tools";
import { ParamsContext } from "../../../../../context/ParamsProvider";

export default function AddPost({
  editPost,
  length,
  title,
  setPosts,
  setParams,
  ...props
}) {
  const [newID, setNewID] = useState({});
  useEffect(() => {
    console.log(editPost);
    setNewID(length);
  }, []);

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
    image_filename: useRef(),
  };

  const canvasRef = {
    resize_axeX: useRef(false),
    resize_axeY: useRef(false),
    canvas: useRef(),
    source: useRef(),
  };

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

  //Reset form
  const handleCancel = () => {
    console.log("cancel");
  };

  const createPost = async (e, fields, image, lastID) => {
    e.preventDefault();

    console.log("Ajout d un nouvelle article ID =>", lastID);

    //calculate timeStamp to publish
    const datePost = new Date();
    const timeStampByDate = datePost.getTime(fields.date.current.input.value);
    const hours = fields.hours.current.input.value * 360 * 1000;
    const minutes = fields.minutes.current.input.value * 1000;
    const timestampTopublish = timeStampByDate + hours + minutes;

    const newID = lastID ? lastID : 0;
    const inputs = {
      userID: fields.userID.current,
      activate: fields.active.current.input,
      alt_FR: fields.alt_FR.current.input,
      alt_EN: fields.alt_EN.current.input,
      fr: {
        title: fields.titleFR.current.input,
        content: fields.contentFR.current.input,
      },
      en: {
        title: fields.titleEN.current.input,
        content: fields.contentEN.current.input,
      },
    };

    console.log("controls input ", inputs.activate.checked);

    //Brut data to article collection
    const newPost = {
      id: newID,
      userID: inputs.userID.value,
      activate: inputs.activate.checked,
      alt_FR: inputs.alt_FR.value,
      alt_EN: inputs.alt_EN.value,
      base64: image.imageBase64,
      en: {
        title: inputs.en.title.value,
        post: inputs.en.content.value,
      },
      fileName: image.name,
      fr: {
        title: inputs.fr.title.value,
        post: inputs.fr.content.value,
      },
      height: image.height,
      imageName: image.name,
      imagePath: `/assets/blog/posts/${newID}/${image.name}`,
      timestamp: timestampTopublish,
      uploadDir: `./public/assets/blog/posts/${newID}`,
      width: image.width,
      edited_By: false,
    };

    //Call APi to add Post

    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const res = await response.json();
    if (response.ok) {
      setPosts({ items: res.newPosts, loading: false });
      setParams((s) => ({ ...s, adminMenu: "posts", adminSubMenu: false }));
    } else {
      alert(JSON.stringify(responseData));
    }
  };

  const editPostValue = (e, fields, image, postId) => {
    e.preventDefault();

    //calculate timeStamp to publish
    const datePost = new Date();
    const timeStampByDate = datePost.getTime(fields.date.current.input.value);
    const hours = fields.hours.current.input.value * 360 * 1000;
    const minutes = fields.minutes.current.input.value * 1000;
    const timestampTopublish = timeStampByDate + hours + minutes;

    const inputs = {
      userID: fields.userID.current,
      activate: fields.active.current.input,
      alt_FR: fields.alt_FR.current.input,
      alt_EN: fields.alt_EN.current.input,
      fr: {
        title: fields.titleFR.current.input,
        content: fields.contentFR.current.input,
      },
      en: {
        title: fields.titleEN.current.input,
        content: fields.contentEN.current.input,
      },
    };

    let newPost = {};

    //Brut data to article collection
    const majPost = {
      id: postId,
      activate: inputs.activate.checked,
      alt_FR: inputs.alt_FR.value,
      alt_EN: inputs.alt_EN.value,
      en: {
        title: inputs.en.title.value,
        post: inputs.en.content.value,
      },
      fr: {
        title: inputs.fr.title.value,
        post: inputs.fr.content.value,
      },
      timestamp: timestampTopublish,
      update_date: Date.now(),
      edited_By: inputs.userID.value,
    };

    //Image Control
    if (image.imageBase64 !== "") {
      const majImage = {
        imagePath: `/assets/blog/posts/${postId}/${image.name}`,
        base64: image.imageBase64,
        fileName: image.name,
        height: image.height,
        width: image.width,
        uploadDir: `./public/assets/blog/posts/${postId}`,
      };

      newPost = Object.assign({}, majPost, majImage);
    } else {
      newPost = majPost;
    }

    //Call APi to add Post
    fetch(`/api/post/${postId}`, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then((res) => {
        console.log("Retour API après la modification d'un article", res);
        setPosts({ items: res.newPosts, loading: false });
        setParams((s) => ({ ...s, adminMenu: "posts", adminSubMenu: false }));
      });
  };

  return (
    <section className="adminContent adminContent-addBlog">
      <header>
        <h1>{props.title}</h1>
      </header>
      <hr></hr>

      <form className="form form_container-addPost">
        <div className="form_addPost">
          <input
            type="hidden"
            value="1"
            id="userID"
            name="userID"
            ref={newPostRef.userID}
          />

          <input
            type="hidden"
            value={editPost ? editPost.fileName : ""}
            id="image_filename"
            name="image_filename"
            ref={newPostRef.image_filename}
          />

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
                default={editPost ? editPost.fr.title : ""}
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
                default={editPost ? editPost.fr.post : ""}
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
                default={editPost ? editPost.en.title : ""}
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
                default={editPost ? editPost.en.post : ""}
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
        </div>

        <div className="form_params">
          <InputBloc
            attr={{
              type: "date",
              label: "Date publication",
              forhtml: "timestamp",
              placeholder: "",
              required: "required",
            }}
            ref={newPostRef.date}
            format="date"
            default={
              editPost ? getDateByTimeStamp(editPost.timestamp, "date") : ""
            }
          />
          <hr></hr>
          <div className="bloc_time">
            <InputBloc
              attr={{
                type: "number",
                label: "Heure",
                forhtml: "hours",
                placeholder: "0",
                min: 0,
                max: 24,
                required: "required",
              }}
              ref={newPostRef.hours}
              format="numeric"
              default={
                editPost
                  ? getDateByTimeStamp(editPost.timestamp, "timer").hours
                  : ""
              }
            />

            <InputBloc
              attr={{
                type: "number",
                label: "Minutes",
                forhtml: "minutes",
                placeholder: "00",
                min: 0,
                max: 60,
                required: "required",
              }}
              ref={newPostRef.minutes}
              format="numeric"
              default={
                editPost
                  ? getDateByTimeStamp(editPost.timestamp, "timer").min
                  : ""
              }
            />
            <hr></hr>

            <InputBloc
              attr={{
                type: "checkbox",
                label: "Activé la publication",
                forhtml: "active_publish",
              }}
              ref={newPostRef.active}
              checked={editPost && editPost.activate === true ? true : false}
            />
          </div>

          <footer>
            <div className="submit_btn">
              <button type="button" onClick={handleCancel}>
                Annuler
              </button>
              {!editPost ? (
                <button
                  type="button"
                  onClick={(e) => {
                    createPost(
                      e,
                      newPostRef,
                      imageUpload,
                      newID,
                      props.setParams
                    );
                  }}
                >
                  Valider
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) =>
                    editPostValue(e, newPostRef, imageUpload, editPost.id)
                  }
                >
                  Modifier
                </button>
              )}
            </div>
          </footer>
        </div>
      </form>
    </section>
  );
}
