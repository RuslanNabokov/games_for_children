import React from "react";
export default function QuestionCard({ question, options }) {
  return (
    <div className="ba b--green pa3 mb3 br2">
      <p className="f5 mb2">{question}</p>
      <div className="flex flex-column gap2">
        {options.map((opt, idx) => (
          <label key={idx} className="flex items-center">
            <input type="radio" name={question} className="mr2" />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
