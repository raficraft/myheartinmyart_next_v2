import React, { useContext } from "react";
import { ParamsContext } from "../../../context/ParamsProvider";

const Hamburger = ({ ...props }) => {
  const { params, setParams } = useContext(ParamsContext);

  const toggle = () => {
    const newState = { hamburger: !params.hamburger };
    setParams(Object.assign({}, params, newState));
  };

  return (
    <div className="hamburger" onClick={toggle} data-active={params.hamburger}>
      <span></span>
    </div>
  );
};

export default Hamburger;
