import React, { useState, useEffect } from 'react';


export default function LostFoundCards({ lf, updateLostFound }) {

    const [formData, setFormData] = useState({
        comment: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/lostfound/comments/${lf.id}`)
            .then(response => response.json())
            .then(data => {
                setComments(data);
            })
            .catch(error => {
                console.error('Error fetching quotes:', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.comment) {
            alert('Please write a comment.');
            return;
        }

        var url = `http://localhost:3001/lostfound/comments`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: formData.comment,
                id: lf.id
            })
        })
            .then(response => response.json())
            .then(data => {
                setComments(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const handleCommentDelete = async (e, commentId) => {
        e.preventDefault();

        fetch('http://localhost:3001/lostfound/comments', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment_id: commentId
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //alert(data.message);
                //console.log(data);
                setComments(data);
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });

    }

    const handleDelete = async (e) => {
        e.preventDefault();

        fetch('http://localhost:3001/lostfound', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: lf.id
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //alert(data.message);
                //console.log(data);
                updateLostFound(data);
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });

    }

    return (

        <>
            <div className="card border-success mb-3" style={{ maxWidth: '20rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}} title={`ID: ${lf.id}`} >
                
                
                
                <div className="card-header">
                    {lf.name}
                    <span className="text-success"> {lf.status} </span>
                    {lf.type}
                    <button type="button" className="btn btn-warning btn-sm position-absolute top-0 end-0" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleDelete}>X</button>
                </div>
                <div className="card-body">
                    <p className="card-text">{lf.animal}</p>
                    <p className="card-text">{lf.description}</p>
                    <p className="card-text">{lf.contact}</p>
                    <p className="card-text" style={{ border: '1px solid white' }}>Comments</p>

                    {comments.length > 0 ? (
                        <div>
                            {comments.map((comment) => <p className="d-flex justify-content-between" key={comment.comment_id}>{comment.comment} <button type="button" className="btn btn-warning btn-sm" onClick={(e) => handleCommentDelete(e, comment.comment_id)}>X</button> </p>)}
                        </div>
                    ) : (
                        <div>
                            {/* <span className="badge bg-secondary">No Comments</span> */}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ maxWidth: '20rem', margin: '0 auto' }}>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="" id="comment" onChange={handleChange} name="comment" value={formData.comment} />
                        </div>
                        <button type="submit" className="btn btn-success btn-sm mt-2">Post</button>
                    </form>

                </div>
                {/* <button type="button" className="btn btn-info" style={{ width: '10px' }} onClick={handleDelete}>X</button> */}
            </div>

        </>


    );
}