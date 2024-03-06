import React, { useState, useEffect } from 'react';


export default function LostFoundUpdate({ updateLostFound }) {


    const [formData, setFormData] = useState({
        id: 0,
        status: 'Found'
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

        fetch('http://localhost:3001/lostfound', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: formData.id,
                status: formData.status
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                //return response.json();
            })
            .then(() => {
                fetch('http://localhost:3001/lostfound')
                    .then(response => response.json())
                    .then(data => {
                        updateLostFound(data);
                    })
                    .catch(error => {
                        console.error('Error fetching quotes:', error);
                    });
            })


        // fetch('http://localhost:3001/lostfound')
        //     .then(response => response.json())
        //     .then(data => {
        //         //console.log("Is this being called?");
        //         //console.log(data); // Log the data to see the structure
        //         updateLostFound(data); // Update the state with the fetched data
        //     })
        //     .catch(error => {
        //         console.error('Error fetching quotes:', error);
        //     });
    }


    return (

        <>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <label className="col-form-label mt-4" style={{ margin: 0 }} htmlFor="id">Card</label> */}
                    {/* <input type="text" style={{ width: '50px' }} className="form-control" placeholder="" id="id" onChange={handleChange} name="id" value={formData.id} /> */}
                    <div className="d-flex align-items-center">
                        <label className="col-form-label mt-4" style={{ margin: 0 }} htmlFor="id">Card</label>
                        <input type="text" style={{ width: '50px', alignSelf: 'center' }} className="form-control" placeholder="" id="id" onChange={handleChange} name="id" value={formData.id} />
                    </div>


                    <label htmlFor="status" className="form-label mt-4" style={{ alignSelf: 'center' }}>Status</label>
                    <select className="form-select" id="status" name="status" onChange={handleChange} value={formData.status} style={{ width: '100px' }}>
                        <option value="Lost">Lost</option>
                        <option value="Found">Found</option>
                    </select>

                    <button type="submit" className="btn btn-success btn-sm">Update</button>
                </div>
            </form>



        </>

    );
}