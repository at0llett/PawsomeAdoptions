import { useState } from "react";

export default function TriviaQuestions({ question, onAnswer }) {

    const [correct, setCorrect] = useState(true);


    const handleSelect = (value) => {
        if (value === question.answer) {
            setCorrect(true);
            onAnswer(true);
        } else {
            setCorrect(false);
            onAnswer(false);
        }
        //setShow(true)
    };

    return (

        <>
            <h3 style={{ marginTop: '80px' }}>{question.question}</h3>
            <button type="button" className="btn btn-dark" style={{ margin: '15px' }} onClick={() => handleSelect(question.choice1)}>
                {question.choice1}
            </button>
            <button type="button" className="btn btn-dark" style={{ margin: '15px' }} onClick={() => handleSelect(question.choice2)}>
                {question.choice2}
            </button>
            <button type="button" className="btn btn-dark" style={{ margin: '15px' }} onClick={() => handleSelect(question.choice3)}>
                {question.choice3}
            </button>
            <button type="button" className="btn btn-dark" style={{ margin: '15px' }} onClick={() => handleSelect(question.choice4)}>
                {question.choice4}
            </button>




            {/* {correct ? (
                <div className="alert alert-dismissible alert-secondary" style={{ width: '300px' }}>
                    <strong>Correct!</strong>
                </div>
            ) : (
                <div className="alert alert-dismissible alert-secondary" style={{ width: '300px' }}>
                    <strong>Wrong!</strong>
                </div>
            )} */}

        </>

    );
}