import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { validInput } from "../../../utils/js/form/validInput";
import manageLocalStorage from "../../../utils/js/manageLocalStorage/manageLocalStorage";
import { debounce } from "./../../../utils/js/tools";

//forwardRef => pass refs from child to parent
export let InputBloc = (props, ref) => {
  const { forhtml, label, type, format = null } = props.attr;

  const inputRef = useRef();
  const errorMessage = useRef(null);

  const controlCapture = debounce((params) => {
    console.log("control capture");
    console.log(validInput(ref));
    errorMessage.current.textContent = validInput(ref);

    //Break 17/09/21 23h
    // Essayez d'excuter plusieurs fonctions dans un seul
    // handle
    // ManageLocalStorage à remonté dans addBlog
    // Pour gérer la sauvegarde de saisie des données

    manageLocalStorage({
      collection: params.collection,
      value: params.value,
      fields: params.fields,
    });
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

  const createAttr = (attr) => {
    const attrRes = {};
    for (const key in attr) {
      if (Object.hasOwnProperty.call(attr, key)) {
        const element = attr[key];

        key === "format" ? "data-format" : key;

        if (key === "forhtml") {
          attrRes["id"] = element;
          attrRes["name"] = element;
        } else if (element !== "textarea" && element !== label) {
          attrRes[key] = element;
        }
      }
    }

    return attrRes;
  };

  const constructElement = () => {
    const element = [];

    switch (type) {
      case "radio":
        return element;

      default:
        label !== "" &&
          element.push(
            <label
              htmlFor={forhtml}
              key={`label_${forhtml}`}
              className={`label-${forhtml}`}
            >
              {label}
            </label>
          );

        if (type === "textarea") {
          element.push(
            <textarea
              className={`textarea-${forhtml}`}
              {...createAttr(props.attr)}
              ref={inputRef}
              onChange={controlCapture}
              data-format={props.format}
            ></textarea>
          );
        } else {
          element.push(
            <input
              className={`input-${forhtml}`}
              {...createAttr(props.attr)}
              type={type}
              ref={inputRef}
              onKeyUp={controlCapture}
              data-format={props.format}
            />
          );
        }
        return element;
    }
  };

  return (
    <div
      className={`inputBloc inputBloc-${type} inputBloc-${forhtml}`}
      key={`div_${forhtml}`}
    >
      {constructElement()}
      <span className="error_message_container" key={`span_${forhtml}`}>
        <p
          className="error_message"
          ref={errorMessage}
          key={`error_${forhtml}`}
        ></p>
      </span>
    </div>
  );
};

InputBloc = forwardRef(InputBloc);
