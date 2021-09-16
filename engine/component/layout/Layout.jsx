import Link from "next/link";
import React, { useContext } from "react";
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

  return (
    <div>
      <header style={{ borderBottom: `1px solid #757c77`, padding: `1rem` }}>
        <h1>Laboratoire</h1>
        <Link href="/">
          <a>{`Home >`}</a>
        </Link>
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
