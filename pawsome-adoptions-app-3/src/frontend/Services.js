import React, { useState } from 'react';
import ServicesTable from './ServicesTable';

export default function Services() {

    const [formData, setFormData] = useState({
        service: 'All',
        zip: 'All'
    });

    const [services, setServices] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        fetch(`http://localhost:3001/services/${formData.service}/${formData.zip}`)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                setServices(data);
            })
            .catch(error => {
                console.error('Error fetching quotes:', error);
            });


    }


    return (

        <>
            <h1>Services by Zip</h1>


            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>

                <div className="form-group">
                    <label htmlFor="service" className="form-label mt-4">Service</label>
                    <select className="form-select" id="service" name="service" onChange={handleChange} value={formData.service}>
                        <option value="All">All</option>
                        <option value="Veterinarian">Veterinarian</option>
                        <option value="Grooming">Grooming</option>
                        <option value="Pet Store">Pet Store</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="zip" className="form-label mt-4">Zip Code</label>
                    <select className="form-select" id="zip" name="zip" onChange={handleChange} value={formData.zip}>
                        <option value="All">All</option>
                        {/* <option value="98333">98333</option> */}
                        <option value="98332">98332</option>
                        <option value="98335">98335</option>
                    </select>
                </div>

                <button style={{ marginTop: '30px' }} type="submit" className="btn btn-success" >Submit</button>

            </form>

            <br/>
            <br/>

            {services.length > 0 ? (
                <div>

                    <table className="table table-hover" style={{ margin: '0 auto', marginTop:'20px', width: '80%' }}>
                        <thead>
                            <tr>
                                <th scope="col">Service</th>
                                <th scope="col">Name</th>
                                <th scope="col">Zip</th>
                                <th scope="col">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => <ServicesTable key={service.id} service={service} />)}
                        </tbody>
                    </table>





                </div>
            ) : (
                <div style={{ marginTop: '20px'}}>
                    <span className="badge bg-secondary">No Services</span>
                </div>
            )}



        </>

    );
}