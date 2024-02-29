import React, { useEffect, useState } from 'react';
import FavCards from './FavCards';

export default function Favorites() {


    const [favorites, setFavorites] = useState([]);

    const updateFavorites = (newFavorites) => {
        setFavorites(newFavorites);
    };

    useEffect(() => {
        fetch('http://localhost:3001/favorites')
            .then(response => response.json())
            .then(data => {
                //console.log("Is this being called?");
                //console.log(data); 
                setFavorites(data);
            })
            .catch(error => {
                console.error('Error fetching favorites:', error);
            });
    }, []);

    return (

        <>

            {favorites.length > 0 ? (
                <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4 g-10' style={{ justifyContent: 'center', margin: '20px' }}>
                    {favorites.map((animal) => <FavCards key={animal.id} animal={animal} updateFavorites={updateFavorites} />)}
                </div>
            ) : (
                <div className='text-center'>
                    <span class="badge bg-warning">No Favorites</span>
                </div>
            )}



        </>

    );
}