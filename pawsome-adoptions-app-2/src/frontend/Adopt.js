import React, { useState } from 'react';
import AnimalCards from './AnimalCards';
import 'bootswatch/dist/vapor/bootstrap.min.css';

const apiUrl = "https://api.petfinder.com/v2/animals";

export default function Adopt() {



    const [animals, setAnimals] = useState([]);


    const [formData, setFormData] = useState({
        type: 'Dog',
        age: 'Baby',
        gender: 'Male',
    });

    const handleDropdownChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();


        fetchAnimals(formData.type, formData.age, formData.gender)
            .then((animalData) => {

                setAnimals(animalData.animals);

                // console.log(animalData.animals.length);
                // console.log(animalData.animals[0].type);


            });


    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                {/* <div className="form-group d-flex justify-content-center align-items-center"> */}

                    <div className="form-group mb-9 d-flex justify-content-center align-items-center">
                        <label htmlFor='type' style={{ width: '200px' }}>Type</label>
                        <select id='type' name='type' value={formData.type} onChange={handleDropdownChange} className="form-control mb-6" style={{ width: '200px' }}>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                        </select>

                    </div>


                    

                    

                    <div className="form-group mb-9 d-flex justify-content-center align-items-center">

                        <label htmlFor='age' style={{ width: '200px' }}>Age</label>
                        <select id='age' name='age' value={formData.age} onChange={handleDropdownChange} className="form-control mb-6" style={{ width: '200px' }}>
                            <option value="baby">Baby</option>
                            <option value="young">Young</option>
                            <option value="adult">Adult</option>
                            <option value="senior">Senior</option>
                        </select>
                    </div>


                    
                    

                    <div className="form-group mb-9 d-flex justify-content-center align-items-center">

                        <label htmlFor='gender' style={{ width: '200px' }}>Gender</label>
                        <select id='gender' name='gender' value={formData.gender} onChange={handleDropdownChange} className="form-control mb-6" style={{ width: '200px' }}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>




                    <br />



                {/* </div> */}
                <button className="btn btn-primary d-block mx-auto my-4" type="submit">Submit</button>

            </form>

            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4 g-10' style={{ justifyContent: 'center', margin: '20px' }}>
                {animals.map((animal, index) => <AnimalCards key={animal.id} animal={animal} index={index} />)}
            </div>
        </>
    );
}

const fetchAnimals = async (type, age, gender) => {

    const accessToken = await getToken();

    try {

        const response = await fetch(`${apiUrl}?type=${type}&age=${age}&gender=${gender}&limit=20`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                //   'mode': 'no-cors',
            }
        });
        if (!response.ok) {
            // alert(response);
            throw new Error('Network response was not ok');
        }
        const data = await response.json();


        return data;

    } catch (error) {
        alert(error);
    }
}

const petfinderClientId = 'MwdqRHY2oANhU1laoYIo1w6Qy6wrRppH1Udo6XdqmB72fhbCm1';
const petfinderClientSecret = 'ksxzSM9GiYLQ0EYO8t1Ue8bTdBsdPgDlgWQpe9Ni';
const petfinderTokenUrl = 'https://api.petfinder.com/v2/oauth2/token';

const getToken = async () => {
    try {
        const response = await fetch(petfinderTokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                grant_type: 'client_credentials',
                client_id: petfinderClientId,
                client_secret: petfinderClientSecret,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to retrieve token');
        }
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

