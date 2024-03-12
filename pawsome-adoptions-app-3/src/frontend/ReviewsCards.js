export default function ReviewsCards({ review, updateReviews }) {

    const handleDelete = async (e) => {
        e.preventDefault();

        fetch('http://localhost:3001/reviews', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: review.id
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                fetch('http://localhost:3001/reviews')
                    .then(response => response.json())
                    .then(data => {
                        //console.log("Is this being called?");
                        //console.log(data); // Log the data to see the structure
                        updateReviews(data); // Update the state with the fetched data
                    })
                    .catch(error => {
                        console.error('Error fetching quotes:', error);
                    });
                //alert(data.message);
                //console.log(data);
                //updateReviews(data);
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });

    }

    return (

        <>
            <div className="card border-success mb-3" style={{ maxWidth: '20rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="card-header">
                    {review.name}
                    <span className="text-success"> {review.status} </span>
                    {review.animal}</div>
                <div className="card-body">
                    <p className="card-text">{review.comment}</p>
                    <p className="card-text">Rating: {review.rating}</p>
                </div>
                <button type="button" className="btn btn-info" style={{ width: '80px' }} onClick={handleDelete}>Delete</button>
            </div>

        </>


    );
}