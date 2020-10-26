import { CanvasContext } from "Context/CanvasContext";
import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar";

import style from "./dboard.module.scss";

const DrawingBoard = () => {
  const [data] = useContext(CanvasContext);
  const { canvas } = data;

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasImageData, setCanvasImageData] = useState({});

  const [markerStrokes, setMarkerStrokes] = useState(0);

  const [canvasColor] = useState(canvas.color);
  const [canvasStrokeWidth] = useState(canvas.strokeWidth);

  useEffect(() => {
    const canvasBoard = canvasRef.current;

    canvasBoard.width = window.innerWidth * 2;
    canvasBoard.height = window.innerHeight * 2;

    canvasBoard.style.width = `${window.innerWidth}px`;
    canvasBoard.style.height = `${window.innerHeight}px`;

    const context = canvasBoard.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = canvasColor;
    context.lineWidth = canvasStrokeWidth;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    contextRef.current.strokeStyle = canvas.color;
    contextRef.current.lineWidth = canvas.strokeWidth;
  }, [canvas]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    contextRef.current.beginPath();
    contextRef.current.translate(0.5, 0.5);
    contextRef.current.moveTo(offsetX, offsetY);

    if (canvas.tool === "marker") {
      setCanvasImageData(
        contextRef.current.getImageData(
          0,
          0,
          window.innerWidth * 2,
          window.innerHeight * 2
        )
      );
      setMarkerStrokes((markerStrokes) => markerStrokes + 1);
      contextRef.current.globalAlpha = 0.5;
      contextRef.current.globalCompositeOperation = "source-atop";
    }
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);

    if (canvas.tool === "marker") {
      console.log("Finish drawing");
      contextRef.current.clearRect(
        0,
        0,
        window.innerWidth * 2,
        window.innerHeight * 2
      );
      contextRef.current.putImageData(canvasImageData, 0, 0);
      contextRef.current.globalCompositeOperation = "source-over";
      contextRef.current.globalAlpha = 1;
      if (markerStrokes) {
        setMarkerStrokes(0);
      }
    }
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <div className={style.wrapper}>
      <Sidebar />
      <div className={style.dataBoard}>
        <h4 style={{ margin: "5px 0" }}>Canvas</h4>

        <p style={{ margin: 0 }}>{`Tool: ${
          canvas.tool ? canvas.tool : "none"
        }, Stroke: ${canvas.strokeWidth}, Color ${canvas.color}`}</p>
        <hr />
        <p>{`Marker strokes - ${markerStrokes}`}</p>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />
    </div>
  );
};

export default DrawingBoard;
