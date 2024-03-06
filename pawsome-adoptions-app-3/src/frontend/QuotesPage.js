import React, { useEffect, useState } from 'react';
import 'bootswatch/dist/vapor/bootstrap.min.css';

export default function QuotesPage() {

    const [formData, setFormData] = useState({
        quote: '',
        author: ''
    });

    const [showQuote, setShowQuote] = useState(false);

    const handleChange = (e) => {
        setShowQuote(false);
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.quote || !formData.author) {
            alert('Please fill in all fields');
            return;
        }

        setShowQuote(true);

        fetch('http://localhost:3001/quotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quote: formData.quote,
                author: formData.author
              })    
        });

        //alert(formData.author);
    }

    return (

        <>

            <h1>Add a quote, any quote!</h1>

            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>

                <div className="form-group">
                    <label htmlFor="quote" className="form-label mt-4">Quote</label>
                    <textarea className="form-control" id="quote" rows="4" onChange={handleChange} name="quote" value={formData.quote}></textarea>
                </div>

                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="author">Author</label>
                    <input type="text" className="form-control" placeholder="" id="author" onChange={handleChange} name="author" value={formData.author} />
                </div>
                <button className="btn btn-primary d-block mx-auto my-4" type="submit">Submit</button>

            </form>

            {showQuote && (
                <div style={{ fontFamily: 'Snell Roundhand, cursive', fontSize: '25px', marginTop: '20px' }}>
                    <p className="text-secondary">{formData.quote} -- {formData.author}</p>
                </div>
            )}

        </>

    );
}