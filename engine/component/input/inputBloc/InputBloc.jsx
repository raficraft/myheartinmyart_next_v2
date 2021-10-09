import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useContext,
} from "react";
import { validInput } from "../../../utils/js/form/validInput";
import { ParamsContext } from "./../../../context/ParamsProvider";
import { debounce } from "./../../../utils/js/tools";
import manageLocalStorage from "../../../utils/js/manageLocalStorage/manageLocalStorage";

//forwardRef => pass refs from child to parent
export let InputBloc = (props, ref) => {
  const [params, setParams] = useContext(ParamsContext);
  const { forhtml, label, type, format = null, checked } = props.attr;
  const inputRef = useRef();
  const errorMessage = useRef(null);

  console.log("paramsContext in INPUT : ", params);

  const controlCapture = debounce((e) => {
    console.log("control capture");
    console.log(validInput(ref));
    errorMessage.current.textContent = validInput(ref);

    manageLocalStorage({
      params,
      ref,
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
        /*
        console.log("element :", element);
        console.log("key :", key);*/

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

  const toto = () => {
    console.log("toto");
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
              onChange={(e) => controlCapture(e)}
              data-format={props.format}
              defaultValue={props.default}
              onKeyUp={toto}
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
              defaultValue={props.default ? props.default : null}
              checked={checked}
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
