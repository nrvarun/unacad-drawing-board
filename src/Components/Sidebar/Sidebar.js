import { useContext, useRef } from "react";

import SVG from "react-inlinesvg";
import { CanvasContext } from "Context/CanvasContext";

const Sidebar = () => {
  const [data, setData] = useContext(CanvasContext);
  const { pen, marker, eraser, colors } = data;

  const listRef = useRef(null);
  const optionsListRef = useRef(null);

  const toggleToolOptions = (e) => {
    const currentTool = e.currentTarget;
    const toolList = listRef.current;

    toolList.querySelectorAll(".c-sidebar__toolslist-item").forEach((item) => {
      item.querySelector(".c-sidebar__tool").classList.remove("active");
    });

    currentTool.classList.add("active");

    if (!currentTool.querySelector("ul")) {
      return false;
    }
  };

  const hex2rgba = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const setOption = (e, value) => {
    const currentOption = e.currentTarget;
    const optionsList = currentOption.closest("ul");

    const optionType = currentOption.dataset.optionType;
    const featureType = currentOption.closest(".c-sidebar__tool").dataset.type;

    if (featureType === "pen") {
      if (optionType === "stroke") {
        setData({
          ...data,
          pen: {
            ...data.pen,
            strokeWidth: value,
          },
          canvas: {
            ...data.canvas,
            tool: "pen",
            strokeWidth: value,
          },
        });
      }

      if (optionType === "color") {
        setData({
          ...data,
          pen: {
            ...data.pen,
            color: value,
          },
          canvas: {
            ...data.canvas,
            tool: "pen",
            color: value,
          },
        });
      }
    }

    if (featureType === "marker") {
      if (optionType === "color") {
        setData({
          ...data,
          marker: {
            ...data.marker,
            color: value,
          },
          canvas: {
            ...data.canvas,
            tool: "marker",
            color: value,
            strokeWidth: 5,
          },
        });
      }
    }

    if (featureType === "eraser") {
      if (optionType === "color") {
        setData({
          ...data,
          canvas: {
            ...data.canvas,
            color: value,
            tool: "eraser",
            strokeWidth: 15,
          },
        });
      }
    }

    optionsList.querySelectorAll("li").forEach((item) => {
      item.classList.remove("active");
    });

    currentOption.classList.add("active");
  };

  return (
    <div className="c-sidebar__wrapper">
      <ul className={"c-sidebar__toolslist"} ref={listRef}>
        <li className={"c-sidebar__toolslist-item"}>
          <div
            className={"c-sidebar__tool"}
            onClick={(e) => toggleToolOptions(e)}
            data-type="pen"
          >
            <div>
              <SVG src={pen.icon} alt={pen.title} className="c-sidebar__icon" />
            </div>
            {pen.options.variants && (
              <div className={"c-sidebar__options-wrapper"}>
                <ul className={"c-sidebar__options-list"} ref={optionsListRef}>
                  {pen.options.variants.map((variant, index) => (
                    <li
                      key={index}
                      data-option-type="stroke"
                      onClick={(e) => setOption(e, variant)}
                    >
                      <span
                        style={{
                          height: variant * pen.options.variants.length,
                          width: variant * pen.options.variants.length,
                        }}
                      ></span>
                    </li>
                  ))}
                  {colors.map((color, index) => (
                    <li
                      key={index}
                      data-option-type="color"
                      onClick={(e) => setOption(e, color)}
                    >
                      <SVG src={pen.filledIcon} fill={color} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </li>
        <li className={"c-sidebar__toolslist-item"}>
          <div
            className={"c-sidebar__tool"}
            onClick={(e) => toggleToolOptions(e)}
            data-type="marker"
          >
            <div>
              <SVG
                src={marker.icon}
                alt={marker.title}
                className="c-sidebar__icon"
              />
            </div>
            <div className={"c-sidebar__options-wrapper"}>
              <ul className={"c-sidebar__options-list"}>
                {colors.map((color, index) => (
                  <li
                    key={index}
                    data-option-type="color"
                    onClick={(e) => setOption(e, hex2rgba(color, 0.5))}
                  >
                    <SVG src={marker.filledIcon} fill={color} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
        <li className={"c-sidebar__toolslist-item"}>
          <div
            className={"c-sidebar__tool"}
            onClick={(e) => toggleToolOptions(e)}
            data-type="eraser"
          >
            <div
              data-option-type="color"
              onClick={(e) => setOption(e, "#ffffff")}
            >
              <SVG
                src={eraser.icon}
                alt={eraser.title}
                className="c-sidebar__icon"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
