import React, { useRef, useImperativeHandle, forwardRef } from "react";

import { debounce } from "./../../../utils/js/tools";

//forwardRef => pass refs from child to parent
export let InputSearch = (props, ref) => {
  const { forHtml, label, placeholder = null, format } = props.attr;

  const inputRef = useRef();
  const errorMessage = useRef(null);

  const controlCapture = debounce(() => {
    console.log("control capture");
    // errorMessage.current.textContent = validInput(ref);
  }, 300);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    get input() {
      return inputRef.current;
    },
    get error() {
      return errorMessage.current;
    },
  }));

  return (
    <div className={`inputBloc inputBloc-search`}>
      {label !== "" && <label forhtml={forHtml}>{label}</label>}
      <input
        type="search"
        placeholder={placeholder}
        name={forHtml}
        id={forHtml}
        ref={inputRef}
        data-format={format}
        onKeyUp={props.filterData}
      />
      <span className="error_message_container">
        <p className="error_message" ref={errorMessage}></p>
      </span>
    </div>
  );
};

InputSearch = forwardRef(InputSearch);
