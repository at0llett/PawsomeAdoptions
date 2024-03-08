import React, { useState } from 'react';
import ResourcesDog from './ResourcesDog';
import ResourcesCat from './ResourcesCat';
import ResourcesAnimals from './ResourcesAnimals';

export default function Resources() {


    const [formData, setFormData] = useState({
        dog: '',
        cat: '',
        animal: '',
    });

    const handleChange = (e) => {
        setNone(true);

        setCats([]);
        setAnimals([]);
        setDogs([]);

        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [dogs, setDogs] = useState([]);
    const [cats, setCats] = useState([]);
    const [animals, setAnimals] = useState([]);

    const [none, setNone] = useState(true);

    const handleDog = async (e) => {

        e.preventDefault();

        setCats([]);
        setAnimals([]);

        const apiKey = 'zdpcXT0D/bHGmwgZdaikaQ==cwqWzjORNLXTTDJj';

        fetch('https://api.api-ninjas.com/v1/dogs?name=' + formData.dog, {
            headers: {
                'X-Api-Key': apiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setDogs(data);
                if (data.length > 0) {
                    setNone(false);
                } else {
                    alert("Not found.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    const handleCat = async (e) => {
        e.preventDefault();

        setDogs([]);
        setAnimals([]);

        const apiKey = 'zdpcXT0D/bHGmwgZdaikaQ==cwqWzjORNLXTTDJj';

        fetch('https://api.api-ninjas.com/v1/cats?name=' + formData.cat, {
            headers: {
                'X-Api-Key': apiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCats(data);
                if (data.length > 0) {
                    setNone(false);
                } else {
                    alert("Not found.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    const handleAnimal = async (e) => {
        e.preventDefault();

        setDogs([]);
        setCats([]);

        const apiKey = 'zdpcXT0D/bHGmwgZdaikaQ==cwqWzjORNLXTTDJj';

        fetch('https://api.api-ninjas.com/v1/animals?name=' + formData.animal, {
            headers: {
                'X-Api-Key': apiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAnimals(data);
                if (data.length > 0) {
                    setNone(false);
                } else {
                    alert("Not found.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    return (

        <>
            <h1>Information on Breeds of Cats, Dogs and Animals</h1>


            <form onSubmit={handleDog} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="dog">Dog Breed</label>
                    <input type="text" className="form-control" placeholder="Golden Retriver" id="dog" onChange={handleChange} name="dog" value={formData.dog} />
                </div>
                <button className="btn btn-primary d-block mx-auto my-4" type="submit">Submit</button>
            </form>

            <form onSubmit={handleCat} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="cat">Cat Breed</label>
                    <input type="text" className="form-control" placeholder="Abyssinian" id="cat" onChange={handleChange} name="cat" value={formData.cat} />
                </div>
                <button className="btn btn-primary d-block mx-auto my-4" type="submit">Submit</button>
            </form>

            <form onSubmit={handleAnimal} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="animal">Animal</label>
                    <input type="text" className="form-control" placeholder="Cheetah" id="animal" onChange={handleChange} name="animal" value={formData.animal} />
                </div>
                <button className="btn btn-primary d-block mx-auto my-4" type="submit">Submit</button>
            </form>

            {none && (
                <span class="badge bg-info">No Animals</span>
            )}

            {dogs.length > 0 && (
                <ResourcesDog dogs={dogs[0]} />
            )}

            {cats.length > 0 && (
                <ResourcesCat cats={cats[0]} />
            )}

            {animals.length > 0 && (
                <ResourcesAnimals animals={animals[0]} />
            )}

        </>

    );
}