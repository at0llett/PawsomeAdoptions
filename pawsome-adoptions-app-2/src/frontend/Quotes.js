import React, { useState, useEffect } from 'react';

export default function Quotes() {



    const [quotesR, setQuotesR] = useState([]);


    useEffect(() => {
        fetch('http://localhost:3001/quotes')
            .then(response => response.json())
            .then(data => {
                //console.log("Is this being called?");
                //console.log(data); // Log the data to see the structure
                setQuotesR(data); // Update the state with the fetched data
            })
            .catch(error => {
                console.error('Error fetching quotes:', error);
            });
    }, []);


    // console.log(quotesR);

    const firstQuote = quotesR.length > 0 ? quotesR[0] : { quote: '', author: '' };

    return (

        <>

            <div style={{ fontFamily: 'Snell Roundhand, cursive', fontSize: '25px', marginTop: '20px' }}>
                <p className="text-secondary">{firstQuote.quote} -- {firstQuote.author}</p>
                

            </div>


        </>

    );
}