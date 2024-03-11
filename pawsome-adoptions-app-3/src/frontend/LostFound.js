import React, { useState, useEffect } from 'react';
import LostFoundCards from './LostFoundCards';
import LostFoundUpdate from './LostFoundUpdate';

export default function LostFound() {

    const [lostfound, setLostFound] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        animal: '',
        status: 'Lost',
        type: 'Dog',
        contact: ''
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

        if (!formData.name || !formData.description || !formData.contact) {
            alert('Please fill in all fields');
            return;
        }

        var url = `http://localhost:3001/lostfound`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                description: formData.description,
                animal: formData.animal,
                status: formData.status,
                type: formData.type,
                contact: formData.contact
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add item');
                }
                // If the POST request was successful, make the GET request
                return fetch(`http://localhost:3001/lostfound`);
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                return response.json();
            })
            .then(data => {
                // Update state with the new data
                setLostFound(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         name: formData.name,
        //         description: formData.description,
        //         animal: formData.animal,
        //         status: formData.status,
        //         type: formData.type,
        //         contact: formData.contact
        //     })
        // })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

        // fetch(`http://localhost:3001/lostfound`)
        //     .then(response => response.json())
        //     .then(data => {
        //         setLostFound(data);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching quotes:', error);
        //     });

    }

    useEffect(() => {
        fetch('http://localhost:3001/lostfound')
            .then(response => response.json())
            .then(data => {
                //console.log("Is this being called?");
                //console.log(data); // Log the data to see the structure
                setLostFound(data); // Update the state with the fetched data
            })
            .catch(error => {
                console.error('Error fetching quotes:', error);
            });
    }, []);

    const updateLostFound = (newLostFound) => {
        setLostFound(newLostFound);
    };


    return (

        <>
            <h1>Lost and Found</h1>

            {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LostFoundUpdate updateLostFound={updateLostFound}/>
            </div> */}


            {lostfound.length > 0 ? (
                <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4 g-10' style={{ justifyContent: 'center', margin: '20px' }}>
                    {lostfound.map((lf) => <LostFoundCards key={lf.id} lf={lf} updateLostFound={updateLostFound} />)}
                </div>
            ) : (
                <div>
                    <span className="badge bg-primary">No Lost or Found Animals</span>
                </div>
            )}



            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="name">Name</label>
                    <input type="text" className="form-control" placeholder="" id="name" onChange={handleChange} name="name" value={formData.name} />
                </div>

                <div className="form-group">
                    <label htmlFor="status" className="form-label mt-4">Status</label>
                    <select className="form-select" id="status" name="status" onChange={handleChange} value={formData.status}>
                        <option value="Lost">Lost</option>
                        <option value="Found">Found</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="type" className="form-label mt-4">Type</label>
                    <select className="form-select" id="type" name="type" onChange={handleChange} value={formData.type}>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Other">Other</option>
                    </select>
                </div>


                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="animal">Animal Name</label>
                    <input type="text" className="form-control" placeholder="" id="animal" onChange={handleChange} name="animal" value={formData.animal} />
                </div>
                <div className="form-group">
                    <label className="form-label mt-4" htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" rows="4" onChange={handleChange} name="description" value={formData.description}></textarea>
                </div>

                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="contact">Contact</label>
                    <input type="text" className="form-control" placeholder="" id="contact" onChange={handleChange} name="contact" value={formData.contact} />
                </div>


                <button style={{ marginTop: '30px' }} type="submit" className="btn btn-success" >Submit</button>
            </form>
        </>

    );
}