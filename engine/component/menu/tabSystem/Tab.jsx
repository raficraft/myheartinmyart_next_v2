import React from "react";

export default function Tab({ children, selected }) {
  return (
    <div className="tabs_content" data-show={selected}>
      {children}
    </div>
  );
}
