import React, { useRef } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

export default function WaterSafetyDrawing() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-b from-blue-100 via-cyan-50 to-blue-200 min-h-screen">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
        Как правильно вести себя вблизи реки или озера?
      </h2>
      <p className="mb-4 text-center">
        Дорисуй, что необходимо для безопасности в воде
      </p>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <ReactSketchCanvas
          ref={canvasRef}
          width="800px"
          height="500px"
          strokeWidth={3}
          strokeColor="#ff0000"
          backgroundImage="/assets/water.png"
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={() => canvasRef.current?.undo()}
        >
          Отменить
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={() => canvasRef.current?.clearCanvas()}
        >
          Очистить
        </button>
      </div>
    </div>
  );
}
