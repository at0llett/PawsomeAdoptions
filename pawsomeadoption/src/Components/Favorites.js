import React, { useEffect, useState } from 'react';
import FavCards from './FavCards';

export default function Favorites() {


    const [favorites, setFavorites] = useState([]);

    const updateFavorites = (newFavorites) => {
        setFavorites(newFavorites);
    };

    useEffect(() => {
        fetch('http://localhost:3001/getFavorites')
            .then(response => response.json())
            .then(data => {
                console.log("Is this being called?");
                console.log(data); // Log the data to see the structure
                setFavorites(data); // Update the state with the fetched data
            })
            .catch(error => {
                console.error('Error fetching favorites:', error);
            });
    }, []);

    return (

        <>

            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4 g-10' style={{ justifyContent: 'center', margin: '20px' }}>
                {favorites.map((animal, index) => <FavCards key={animal.id} animal={animal} index={index} updateFavorites={updateFavorites}/>)}
            </div>

        </>

    );
}