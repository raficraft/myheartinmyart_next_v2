import React, { useContext } from "react";
import { ParamsContext } from "./../../context/ParamsProvider";

export default function AdminLeftPanel() {
  const { params, setParams } = useContext(ParamsContext);

  const toggleAdmin = (e, menu) => {
    const newState = { adminMenu: menu, adminSubMenu: "" };
    setParams(Object.assign({}, params, newState));
  };

  const toggleSubAdmin = (e, menu) => {
    e.stopPropagation();
    const newState = { adminSubMenu: menu };
    setParams(Object.assign({}, params, newState));
  };

  return (
    <aside className="admin_left">
      <ul className="admin_left-list accordion">
        <li
          className="accordion-item"
          id="home"
          onClick={(e) => toggleAdmin(e, "Home")}
        >
          <a href="#home" className="accordion-btn">
            Home
          </a>
        </li>

        <li
          className="accordion-item"
          id="user"
          onClick={(e) => toggleAdmin(e, "User")}
        >
          <a href="#user" className="accordion-btn">
            User
          </a>
        </li>

        <li
          className="accordion-item"
          id="blog"
          onClick={(e) => toggleAdmin(e, "Blog")}
        >
          <a href="#blog" className="accordion-btn">
            Blog
          </a>
          <div className="accordion_submenu">
            <a
              href="#"
              className="accordion_submenu-item"
              onClick={(e) => toggleSubAdmin(e, "addPost")}
            >
              Add Post
            </a>
          </div>
        </li>

        <li
          className="accordion-item"
          id="gallery"
          onClick={(e) => toggleAdmin(e, "Gallery")}
        >
          <a href="#gallery" className="accordion-btn">
            Gallery
          </a>
          <div className="accordion_submenu">
            <a
              href="#"
              className="accordion_submenu-item"
              onClick={(e) => toggleSubAdmin(e, "addImage")}
            >
              Add Image
            </a>
            <a
              href="#"
              className="accordion_submenu-item"
              onClick={(e) => toggleSubAdmin(e, "manageCategories")}
            >
              Categories
            </a>
          </div>
        </li>
        <li
          className="accordion-item"
          id="video"
          onClick={(e) => toggleAdmin(e, "Video")}
        >
          <a href="#video" className="accordion-btn">
            Vid??o
          </a>
          <div className="accordion_submenu">
            <a
              href="#"
              className="accordion_submenu-item"
              onClick={(e) => toggleSubAdmin(e, "addVideo")}
            >
              Add Vid??o
            </a>
          </div>
        </li>
      </ul>
    </aside>
  );
}
