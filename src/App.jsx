import React, { useState } from "react";
import Header from "./components/Header";
import StageNav from "./components/StageNav";
import StageContent from "./components/StageContent";

export default function App() {
  const [stage, setStage] = useState(1);
  return (
    <>
      <Header />
      <StageNav current={stage} onSelect={setStage} />
      <div className="mt4">
        <StageContent stage={stage} />
      </div>
    </>
  );
}
