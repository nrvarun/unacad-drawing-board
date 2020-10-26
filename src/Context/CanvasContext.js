import React, { createContext, useState } from "react";

export const CanvasContext = createContext();

export const CanvasContextProvider = ({ children }) => {
  const [canvasState, setCanvasState] = useState({
    colors: ["#262a25", "#f15556", "#258ae6", "#45eb6f", "#ffd736"],
    pen: {
      title: "pen",
      icon: "./assets/pen.svg",
      filledIcon: "./assets/pen-filled.svg",
      options: {
        variants: [1, 3, 5],
      },
      color: "#000000",
      strokeWidth: 1,
    },
    marker: {
      title: "marker",
      icon: "./assets/marker.svg",
      filledIcon: "./assets/marker-filled.svg",
      color: "#000000",
      strokeWidth: 5,
    },
    eraser: {
      title: "eraser",
      icon: "./assets/eraser.svg",
      color: "#ffffff",
      strokeWidth: 15,
    },
    canvas: {
      tool: "",
      color: "#000000",
      strokeWidth: 2,
    },
  });

  return (
    <CanvasContext.Provider value={[canvasState, setCanvasState]}>
      {children}
    </CanvasContext.Provider>
  );
};
