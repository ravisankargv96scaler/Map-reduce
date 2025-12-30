import React, { useState } from 'react';
import { CheckCircle, XCircle, Award } from 'lucide-react';
import { QuizQuestion } from '../types';

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which phase involves parallel processing of input splits?",
    options: ["Shuffle", "Reduce", "Map", "Combine"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which phase is responsible for grouping data by key across the network?",
    options: ["Map", "Shuffle & Sort", "Reduce", "Input Split"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "The output of the Map phase is typically in what format?",
    options: ["Raw Text", "Compressed Binary", "Key-Value Pairs", "SQL Tables"],
    correctAnswer: 2
  }
];

const TabQuiz: React.FC = () => {
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (showResults) return;
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    return answers.reduce((score, ans, idx) => score + (ans === questions[idx].correctAnswer ? 1 : 0), 0);
  };

  const allAnswered = answers.every(a => a !== -1);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Award className="text-yellow-400" />
          Knowledge Check
        </h2>

        <div className="space-y-8">
          {questions.map((q, qIdx) => (
            <div key={q.id} className="border-b border-slate-700 pb-6 last:border-0">
              <h3 className="text-lg font-semibold text-slate-200 mb-4">{qIdx + 1}. {q.question}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((option, oIdx) => {
                  let statusClass = "bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-300";
                  
                  if (showResults) {
                    if (oIdx === q.correctAnswer) {
                      statusClass = "bg-green-900/40 border-green-500 text-green-300";
                    } else if (answers[qIdx] === oIdx && answers[qIdx] !== q.correctAnswer) {
                      statusClass = "bg-red-900/40 border-red-500 text-red-300";
                    } else {
                      statusClass = "opacity-50 bg-slate-800 border-slate-700";
                    }
                  } else {
                     if (answers[qIdx] === oIdx) {
                        statusClass = "bg-blue-600 border-blue-400 text-white ring-2 ring-blue-400/50";
                     }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(qIdx, oIdx)}
                      className={`p-3 rounded-lg border text-left transition-all flex justify-between items-center ${statusClass}`}
                    >
                      <span>{option}</span>
                      {showResults && oIdx === q.correctAnswer && <CheckCircle size={18} />}
                      {showResults && answers[qIdx] === oIdx && answers[qIdx] !== q.correctAnswer && <XCircle size={18} />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
            <div className="text-lg font-bold">
                {showResults && (
                    <span className={calculateScore() === 3 ? "text-green-400" : "text-slate-300"}>
                        Score: {calculateScore()} / {questions.length}
                    </span>
                )}
            </div>
            {!showResults ? (
                <button
                    onClick={() => setShowResults(true)}
                    disabled={!allAnswered}
                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all"
                >
                    Submit Answers
                </button>
            ) : (
                <button
                    onClick={() => {
                        setShowResults(false);
                        setAnswers(new Array(questions.length).fill(-1));
                    }}
                    className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-8 rounded-full transition-all"
                >
                    Retake Quiz
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default TabQuiz;
