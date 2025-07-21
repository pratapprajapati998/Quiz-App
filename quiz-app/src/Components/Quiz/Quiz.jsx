
import React, { useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[0]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState("light");

  const checkAns = (e, ans) => {
    const options = document.querySelectorAll("li");
    options.forEach(opt => {
      opt.classList.remove("correct", "wrong", "clicked");
    });

    e.target.classList.add("clicked");

    if (question.ans === ans) {
      e.target.classList.add("correct");
      setScore(score + 1);
    } else {
      e.target.classList.add("wrong");
    }
  };

  const handleNext = () => {
    const options = document.querySelectorAll("li");
    options.forEach(opt => opt.classList.remove("correct", "wrong", "clicked"));

    if (index + 1 < data.length) {
      const newIndex = index + 1;
      setIndex(newIndex);
      setQuestion(data[newIndex]);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    const options = document.querySelectorAll("li");
    options.forEach(opt => opt.classList.remove("correct", "wrong", "clicked"));

    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      setQuestion(data[newIndex]);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setShowResult(false);
    const options = document.querySelectorAll("li");
    options.forEach(opt => opt.classList.remove("correct", "wrong", "clicked"));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`container ${theme}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        Toggle {theme === "light" ? "🌙 Dark" : "☀️ Light"} Mode
      </button>

      <h1>🚀 Quiz App</h1>
      <hr />
      {showResult ? (
        <>
          <h2 className="result-message">🎉 Your quiz is over!</h2>
          <p className="score">You scored: {score} out of {data.length}</p>
          <button onClick={handleRestart}>🔁 Restart Quiz</button>
        </>
      ) : (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
            <li onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
            <li onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
            <li onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
          </ul>

          <div className="button-group">
            <button onClick={handleBack}>⬅ Back</button>
            <button onClick={handleNext}>Next ➡</button>
          </div>
          <div className="index">{index + 1} of {data.length} questions</div>
        </>
      )}
    </div>
  );
};

export default Quiz;

