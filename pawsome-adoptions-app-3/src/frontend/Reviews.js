import React, { useState, useEffect } from 'react';
import ReviewsCards from './ReviewsCards';

export default function Reviews() {

    const [formData, setFormData] = useState({
        name: '',
        comment: '',
        animal: '',
        rating: 1,
        status: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const updateReviews = (newReviews) => {
        setReviews(newReviews);
    };

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/reviews')
            .then(response => response.json())
            .then(data => {
                //console.log("Is this being called?");
                //console.log(data); // Log the data to see the structure
                setReviews(data); // Update the state with the fetched data
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.comment || !formData.animal) {
            alert('Please fill in all fields');
            return;
        }

        var url = `http://localhost:3001/reviews`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                comment: formData.comment,
                animal: formData.animal,
                rating: formData.rating,
                status: formData.status
            })
        })
            .then(response => response.json())
            .then(data => {
                fetch('http://localhost:3001/reviews')
                    .then(response => response.json())
                    .then(data => {
                        //console.log("Is this being called?");
                        //console.log(data); // Log the data to see the structure
                        setReviews(data); // Update the state with the fetched data
                    })
                    .catch(error => {
                        console.error('Error fetching quotes:', error);
                    });
            })
            .catch((error) => {
                //alert("ISBN does not correspond to book!");
                alert(error);
                console.error('Error:', error);
            });

    }

    return (



        <>
            <h1>Success Stories!</h1>

            {reviews.length > 0 ? (
                <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4 g-10' style={{ justifyContent: 'center', margin: '20px' }}>
                    {reviews.map((review) => <ReviewsCards key={review.id} review={review} updateReviews={updateReviews} />)}
                </div>
            ) : (
                <div>
                    <span className="badge bg-primary">No Reviews</span>
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="name">Name</label>
                    <input type="text" className="form-control" placeholder="" id="name" onChange={handleChange} name="name" value={formData.name} />
                </div>

                <div className="form-group">
                    <label htmlFor="status" className="form-label mt-4">Status</label>
                    <select className="form-select" id="status" name="status" onChange={handleChange} value={formData.genre}>
                        <option value="Adopted">Adopted</option>
                        <option value="Lost">Lost</option>
                        <option value="Found">Found</option>
                        <option value="Learned About">Learned About</option>
                    </select>
                </div>


                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="animal">Animal</label>
                    <input type="text" className="form-control" placeholder="" id="animal" onChange={handleChange} name="animal" value={formData.animal} />
                </div>
                <div className="form-group">
                    <label className="form-label mt-4" htmlFor="comment">Comment</label>
                    <textarea className="form-control" id="comment" rows="4" onChange={handleChange} name="comment" value={formData.comment}></textarea>
                </div>
                <fieldset className="form-group">

                    <label htmlFor="rating" className="form-label">Rating: {formData.rating}</label>
                    <input type="range" className="form-range" min="1" max="5" step="1" id="rating" onInput={handleChange} name="rating" value={formData.rating}></input>

                </fieldset>
                <button style={{ marginTop: '30px' }} type="submit" className="btn btn-success" >Submit</button>
            </form>

        </>


    );
}