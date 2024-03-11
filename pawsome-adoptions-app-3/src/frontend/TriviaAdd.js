import React, { useState } from 'react';

export default function TriviaAdd() {

    const [formData, setFormData] = useState({
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        answer: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if answer equals one of the choices

        if (formData.answer === formData.choice1 || formData.answer === formData.choice2 || formData.answer === formData.choice3 || formData.answer === formData.choice4) {
            alert("Added to Database!");

            fetch('http://localhost:3001/trivia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: formData.question,
                choice1: formData.choice1,
                choice2: formData.choice2,
                choice3: formData.choice3,
                choice4: formData.choice4,
                answer: formData.answer
              })    
        });

        } else {
            alert("Answer must equal one of the choices!");
        }

    }

    return (

        <>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="question">Question</label>
                    <input type="text" className="form-control" placeholder="" id="question" onChange={handleChange} name="question" value={formData.question} />
                </div>

                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="choice1">Choice One</label>
                    <input type="text" className="form-control" placeholder="" id="choice1" onChange={handleChange} name="choice1" value={formData.choice1} />
                </div>

                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="choice2">Choice Two</label>
                    <input type="text" className="form-control" placeholder="" id="choice2" onChange={handleChange} name="choice2" value={formData.choice2} />
                </div>

                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="choice3">Choice Three</label>
                    <input type="text" className="form-control" placeholder="" id="choice3" onChange={handleChange} name="choice3" value={formData.choice3} />
                </div>
                
                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="choice4">Choice Four</label>
                    <input type="text" className="form-control" placeholder="" id="choice4" onChange={handleChange} name="choice4" value={formData.choice4} />
                </div>

                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="answer">Answer</label>
                    <input type="text" className="form-control" placeholder="" id="answer" onChange={handleChange} name="answer" value={formData.answer} />
                </div>
                
                
                <button style={{ marginTop: '30px' }} type="submit" className="btn btn-success" >Submit</button>
            </form>
        </>

    );
}