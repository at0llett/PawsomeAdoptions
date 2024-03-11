import React, { useState, useEffect } from 'react';
import TriviaQuestions from './TriviaQuestions';

export default function Trivia() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [start, setStart] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [timer, setTimer] = useState(10);


    useEffect(() => {
        let interval;
        if (!start) {
            interval = setInterval(() => {
                if (timer > 0) {
                    setTimer(prevTimer => prevTimer - 1);
                } else {
                    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                    setTimer(10);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timer, start]);


    useEffect(() => {
        fetch('http://localhost:3001/trivia')
            .then(response => response.json())
            .then(data => {
                setQuestions(data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, []);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        setShowAlert(true);
        setIsCorrect(isCorrect);


        setTimeout(() => {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setShowAlert(false);
        }, 1300);

        setTimer(10);
    };

    const handleClick = () => {
        setStart(false);
        //setTimer(10);
    };

    return (
        <>


            {start && (
                <button type="button" className="btn btn-info" onClick={handleClick} style={{ marginTop: '80px' }}>Start Game</button>
            )}



            {!start && questions.length > 0 && currentQuestionIndex < questions.length && (
                <div>
                    <div>Time: {timer}</div>

                    <TriviaQuestions
                        key={questions[currentQuestionIndex].id}
                        question={questions[currentQuestionIndex]}
                        onAnswer={handleAnswer}
                    />
                    {showAlert && (
                        <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                            <div className={`alert alert-dismissible alert-${isCorrect ? 'success' : 'danger'}`} style={{ width: '300px', textAlign: 'center', fontSize: '30px' }}>
                                <strong>{isCorrect ? 'Correct!' : 'Wrong!'}</strong>
                            </div>
                        </div>
                    )}

                </div>
            )}



            {currentQuestionIndex >= questions.length && (
                <div>
                    <h2>Game Over!</h2>
                    <h3>Your score: {score} / {questions.length}</h3>
                    {score === 5 && (
                        <h3>Perfect score, well done!</h3>
                    )}
                    {score === 4 && (
                        <h3>So close!</h3>
                    )}
                    {score === 3 && (
                        <h3>Almost there!</h3>
                    )}
                    {score === 2 && (
                        <h3>A little bit more.</h3>
                    )}
                    {score === 1 && (
                        <h3>Nope!</h3>
                    )}
                    {score === 0 && (
                        <h3>Bad.</h3>
                    )}
                </div>
            )}
        </>
    );
}
