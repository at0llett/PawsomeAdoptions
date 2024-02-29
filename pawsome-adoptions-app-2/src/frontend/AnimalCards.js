//import React, { useEffect, useState } from 'react';
import 'bootswatch/dist/vapor/bootstrap.min.css';

export default function AnimalCards({ animal, index }) {


    var image = "";

    if (animal.photos && animal.photos.length > 0) {
        image = animal.photos[0].small;
    } else {
        image = process.env.PUBLIC_URL + '/Images/no.jpg';
    }

    const handleClick = () => {

        console.log(animal.id);

        fetch('http://localhost:3001/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: animal.id,
                name: animal.name,
                type: animal.type,
                gender: animal.gender,
                age: animal.age,
                size: animal.size,
                image: image
              })    
        });

        //alert("Button clicked!");
    };

    return (
        <>
            <div className="card text-white bg-primary mb-3" style={{ maxWidth: '20rem' }} key={animal.id}>
                <div className="card-header text-center">{animal.name}</div>
                <div className="card-body text-center">
                    <img src={image} alt={animal.name} style={{ opacity: 1, width: '100px', height: '100px' }} />

                    <p className="card-text">{animal.type}</p>
                    <p className="card-text">{animal.gender}</p>
                    <p className="card-text">{animal.age}</p>
                    <p className="card-text">{animal.size}</p>

                    <button type="button" onClick={handleClick} className="btn btn-secondary">Add to Favorites</button>
                </div>
            </div>
        </>
    );
}