import React, { useRef } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useNavigate } from "react-router-dom";


export default function WaterSafetyDrawing() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const navigate = useNavigate();
  const randomImage = `/assets/water${Math.floor(Math.random() * 3) + 1}.jpg` ;

    const handleDone = () => {
    alert("Молодец! Ты отлично справился! 🎉");
    navigate('/home');
  };


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
          strokeColor="blue"
          backgroundImage={randomImage}
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-600 transition"
          onClick={() => canvasRef.current?.undo()}
        >
          Отменить
        </button>
        <button
          className="mt-6 px-6 py-3 bg-red-600  text-white rounded hover:bg-red-600 transition"
          onClick={() => canvasRef.current?.clearCanvas()}
        >
          Очистить
        </button>
       <button
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={handleDone}
      >
        Готово
      </button>
      </div>
    </div>
  );
}
