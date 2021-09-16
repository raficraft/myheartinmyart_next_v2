import React, { useContext } from "react";
import { ParamsContext } from "../../../context/ParamsProvider";
import { BsGearFill } from "react-icons/bs";

export default function AdminIcon() {
  const { params, setParams } = useContext(ParamsContext);

  const toggle = () => {
    const newState = { admin: !params.admin };
    setParams(Object.assign({}, params, newState));
    console.log("params admin", params);
  };

  return (
    <div className="admin_icon" onClick={toggle}>
      <BsGearFill />
    </div>
  );
}
