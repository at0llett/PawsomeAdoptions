import React, { useEffect, useState } from 'react';
import 'bootswatch/dist/vapor/bootstrap.min.css';

export default function FavCards({ animal, updateFavorites }) {

    //const [items, setItems] = useState();


    var image = "";

    

    const handleClick = () => {

        fetch('http://localhost:3001/favorites', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: animal.id
              })    
        }) 
        .then(response => response.json())
        .then(data => {
            //console.log("Is this being called?");
            //console.log(data); // Log the data to see the structure
            updateFavorites(data); // Update the state with the fetched data
        });

       

        
    };


    // if (animal.image && animal.image.length > 0) {
    //     image = animal.photos[0].small;
    // } else {
    //     image = process.env.PUBLIC_URL + '/Images/no.jpg';
    // }

    return (
        <>
            <div className="card text-white bg-primary mb-3" style={{ maxWidth: '20rem' }} key={animal.id}>
                <div className="card-header text-center">{animal.name}</div>
                <div className="card-body text-center">
                    <img src={animal.image} alt={animal.name} style={{ opacity: 1, width: '100px', height: '100px' }} />

                    <p className="card-text">{animal.type}</p>
                    <p className="card-text">{animal.gender}</p>
                    <p className="card-text">{animal.age}</p>
                    <p className="card-text">{animal.size}</p>

                    <button type="button" onClick={handleClick} className="btn btn-secondary">Remove</button>
                </div>
            </div>
        </>
    );
}