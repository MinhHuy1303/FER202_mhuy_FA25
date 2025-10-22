import React, { useReducer, useEffect, useRef } from "react";
import { Button, Container, Card, ProgressBar, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaTrophy } from "react-icons/fa";
const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  showFeedback: false,
  isCorrect: false,
  timeLeft: 10,
  highScore: 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "SUBMIT_ANSWER":
      const isCorrect =
        state.selectedOption === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        showFeedback: true,
        isCorrect: isCorrect,
        score: isCorrect ? state.score + 1 : state.score,
      };

    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        showFeedback: false,
        timeLeft: 10,
        showScore: state.currentQuestion + 1 === state.questions.length,
      };

    case "TIME_UP":
      return {
        ...state,
        showFeedback: true,
        isCorrect: false,
        selectedOption: state.selectedOption || "No answer",
      };

    case "TICK":
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };

    case "RESTART_QUIZ":
      // Lưu high score trước khi restart
      const currentHighScore = parseInt(localStorage.getItem('quizHighScore') || '0');
      const newHighScore = Math.max(currentHighScore, state.score);
      localStorage.setItem('quizHighScore', newHighScore.toString());
      
      return {
        ...initialState,
        highScore: newHighScore,
        timeLeft: 10,
      };

    case "LOAD_HIGH_SCORE":
      return {
        ...state,
        highScore: action.payload,
      };

    default:
      return state;
  }
}
// Component chính
function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const timerRef = useRef(null);
  
  const { 
    questions, 
    currentQuestion, 
    selectedOption, 
    score, 
    showScore, 
    showFeedback, 
    isCorrect, 
    timeLeft, 
    highScore 
  } = state;

  // Load high score khi component mount
  useEffect(() => {
    const savedHighScore = parseInt(localStorage.getItem('quizHighScore') || '0');
    dispatch({ type: "LOAD_HIGH_SCORE", payload: savedHighScore });
  }, []);

  // Timer effect
  useEffect(() => {
    if (!showScore && !showFeedback && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    } else if (timeLeft === 0 && !showFeedback) {
      dispatch({ type: "TIME_UP" });
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, showScore, showFeedback]);

  const handleOptionSelect = (option) => {
    if (!showFeedback) {
      dispatch({ type: "SELECT_OPTION", payload: option });
    }
  };

  const handleSubmitAnswer = () => {
    dispatch({ type: "SUBMIT_ANSWER" });
  };

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  const getTimerColor = () => {
    if (timeLeft <= 5) return "danger";
    if (timeLeft <= 10) return "warning";
    return "success";
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        {showScore ? (
          <div className="text-center">
            <h2>
              <FaTrophy className="text-warning me-2" />
              Quiz Completed!
            </h2>
            <h3>
              Your Score: {score} / {questions.length}
            </h3>
            {highScore > 0 && (
              <Alert variant="info">
                <strong>High Score: {highScore} / {questions.length}</strong>
                {score === highScore && score > 0 && (
                  <div className="mt-2">
                    🎉 New High Score! 🎉
                  </div>
                )}
              </Alert>
            )}
            <Button variant="primary" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span style={{ color: timeLeft <= 5 ? 'red' : 'black' }}>
                  Time: {timeLeft}s
                </span>
              </div>
              <ProgressBar 
                now={((currentQuestion + 1) / questions.length) * 100} 
                variant="info"
              />
            </div>

            {/* Timer Bar */}
            <div className="mb-3">
              <ProgressBar 
                now={(timeLeft / 10) * 100} 
                variant={getTimerColor()}
                style={{ height: '8px' }}
              />
            </div>

            <h4>
              {questions[currentQuestion].question}
            </h4>

            {/* Feedback */}
            {showFeedback && (
              <Alert variant={isCorrect ? "success" : "danger"} className="mt-3">
                {isCorrect ? (
                  <div>
                    <FaCheckCircle className="me-2" />
                    Correct! 🎉
                  </div>
                ) : (
                  <div>
                    <FaTimesCircle className="me-2" />
                    Incorrect! The correct answer is: <strong>{questions[currentQuestion].answer}</strong>
                  </div>
                )}
              </Alert>
            )}

            <div className="mt-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    showFeedback
                      ? option === questions[currentQuestion].answer
                        ? "success"
                        : option === selectedOption && !isCorrect
                        ? "danger"
                        : "outline-secondary"
                      : selectedOption === option
                      ? "primary"
                      : "outline-secondary"
                  }
                  className="m-2"
                  onClick={() => handleOptionSelect(option)}
                  disabled={showFeedback}
                >
                  {option}
                </Button>
              ))}
            </div>

            {!showFeedback ? (
              <Button
                variant="primary"
                className="mt-3"
                disabled={!selectedOption || timeLeft === 0}
                onClick={handleSubmitAnswer}
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                variant="primary"
                className="mt-3"
                onClick={handleNextQuestion}
              >
                {currentQuestion === questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}
              </Button>
            )}
          </div>
        )}
      </Card>
    </Container>
  );
}
export default QuestionBank;