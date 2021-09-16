import Link from "next/link";
import { useContext } from "react";
import { ParamsContext } from "./../../context/ParamsProvider";

const HamburgerMenu = (props) => {
  const { params, setParams } = useContext(ParamsContext);

  const toggleMenu = () => {
    setParams(
      Object.assign({}, params, {
        hamburger: !params.hamburger,
      })
    );
  };

  return (
    <aside className="main-aside" data-animate={params.hamburger}>
      <div className="push_social">
        <nav>
          <Link href="/blog/Posts">
            <a
              className="btn-aside btn-blog"
              data-animate={params.hamburger}
              onClick={toggleMenu}
            >
              Blog
            </a>
          </Link>

          <Link href="/video/Youtube">
            <a
              className="btn-aside btn-video"
              data-animate={params.hamburger}
              onClick={toggleMenu}
            >
              Video
            </a>
          </Link>

          <Link href="/art/Gallery">
            <a
              type="button"
              className="btn-aside btn-art"
              data-animate={params.hamburger}
              onClick={toggleMenu}
            >
              My Art
            </a>
          </Link>

          <Link href="/about/Heart">
            <a
              className="btn-aside btn-heart"
              data-animate={params.hamburger}
              onClick={toggleMenu}
            >
              My Heart
            </a>
          </Link>
        </nav>
      </div>

      <div className="social" data-animate={params.hamburger}>
        <p className="social_icon">F</p>
        <p className="social_icon">Y</p>
        <p className="social_icon">I</p>
        <p className="social_icon">G</p>
      </div>
    </aside>
  );
};

export default HamburgerMenu;
