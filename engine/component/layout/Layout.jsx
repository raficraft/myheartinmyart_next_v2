import Link from "next/link";
import React, { useContext, useRef } from "react";
import Hamburger from "./../button/hamburger/Hamburger";
import { ParamsContext } from "../../context/ParamsProvider";
import { useRouter } from "next/dist/client/router";
import HamburgerMenu from "../menu/hamburgerMenu";
import AdminIcon from "./../button/adminIcon/AdminIcon";
import AdminContainer from "../admin/AdminContainer";

export default function Layout({ children }) {
  const { params, setParams } = useContext(ParamsContext);

  const router = useRouter();
  console.log("params router ", router);

  const inputs = {
    language: useRef(),
  };

  const handleChange = (e) => {
    console.log(e);
    console.log();

    const currentLanguage = e.target.value;

    const newContext = { language: currentLanguage };
    setParams(Object.assign({}, params, newContext));
  };

  console.log("render :", { log: params.language });

  return (
    <div>
      <header
        className="header_top"
        style={{ borderBottom: `1px solid #757c77`, padding: `1rem` }}
      >
        <div id="header_01">
          <h1>Laboratoire</h1>
          <Link href="/">
            <a>{`Home >`}</a>
          </Link>
        </div>

        {/*Create a component for this div*/}
        <div id="header_02">
          <div>
            <select ref={inputs.language} onChange={(e) => handleChange(e)}>
              <option value="FR">FR</option>
              <option value="EN">EN</option>
            </select>
          </div>
        </div>
        {
          //params.user.isAuth && <p>Admin</p>
        }

        <Hamburger />
      </header>
      {children}

      <HamburgerMenu />
      {params.user.isAuth && (
        <>
          <AdminIcon />
          <AdminContainer data-animate={params.admin} />
        </>
      )}

      <footer>
        <h1>Footer</h1>
      </footer>
    </div>
  );
}
