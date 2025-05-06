// src/components/RoadMap.tsx
import React from 'react';
import { ProgressBar, Step } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';

interface RoadMapProps {
  currentStep: number;
  totalSteps: number;
}

export default function RoadMap({ currentStep, totalSteps }: RoadMapProps) {
  const percent = Math.floor((currentStep / totalSteps) * 100);

  return (
    <ProgressBar
      percent={percent}
      height={12}
      filledBackground="linear-gradient(to right, #4caf50, #8bc34a)"
    >
      {Array.from({ length: totalSteps }).map((_, idx) => (
        <Step key={idx}>
          {({ accomplished }) => (
            <div className={`step ${accomplished ? 'accomplished' : ''}`}>
              {idx + 1}
            </div>
          )}
        </Step>
      ))}
      <style jsx>{`
        .step {
          width: 24px;
          height: 24px;
          background-color: #bbb;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #fff;
        }
        .step.accomplished {
          background-color: #4caf50;
        }
      `}</style>
    </ProgressBar>
  );
}
