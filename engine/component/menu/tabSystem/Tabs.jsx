import React, { useState } from "react";

export const Tabs = ({ children }) => {
  //Get props of children
  const childrenArray = React.Children.toArray(children);
  const [current, setCurrent] = useState(childrenArray[0].key);
  const newChildren = childrenArray.map((child) => {
    return React.cloneElement(child, { selected: child.key === current });
  });

  const createNav = () => {
    return (
      <div className="tabs">
        <nav>
          {childrenArray.map((child) => {
            return (
              <button
                type="button"
                key={child.key}
                onClick={() => setCurrent(child.key)}
                data-current={child.key === current ? true : false}
              >
                {child.props.title}
              </button>
            );
          })}
        </nav>
        {newChildren}
      </div>
    );
  };

  return [createNav()];
};
