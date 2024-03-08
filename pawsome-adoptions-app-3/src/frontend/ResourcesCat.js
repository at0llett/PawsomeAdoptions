export default function ResourcesCat({ cats }) {
    return (

        <>
            <h3>{cats.name}</h3>
            <img src={cats.image_link} alt="cat" style={{ width: '380px', height: '300px' }} />

            <table className="table table-hover" style={{ width: '380px', margin: 'auto' }}>
                <thead>
                    <tr>
                        <th scope="col" style={{ fontSize: '20px' }}>Features</th>
                        <th scope="col" style={{ fontSize: '20px' }}>Scale</th>
                        <th scope="col" style={{ fontSize: '20px' }}>Ranking</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="table-info">
                        <td>Origin</td>
                        <td>----</td>
                        <td>{cats.origin}</td>
                    </tr>
                    <tr className="table-dark">
                        <td>Family Friendly</td>
                        <td>1: Min, 5: Max</td>
                        <td>{cats.family_friendly}</td>
                    </tr>

                    <tr className="table-info">
                        <td>Shedding</td>
                        <td>1: Min, 5: Max</td>
                        <td>{cats.shedding}</td>
                    </tr>
                    <tr className="table-dark">
                        <td>Grooming</td>
                        <td>1: Max, 5: Min</td>
                        <td>{cats.grooming}</td>
                    </tr>

                    <tr className="table-info">
                        <td>Other Pets Friendly</td>
                        <td>1: Not, 5: Very</td>
                        <td>{cats.other_pets_friendly}</td>
                    </tr>
                    <tr className="table-dark">
                        <td>Intelligence</td>
                        <td>1: Not, 5: Very</td>
                        <td>{cats.intelligence}</td>
                    </tr>

                    <tr className="table-primary">
                        <td>Life Expectancy</td>
                        <td>Max</td>
                        <td>{cats.max_life_expectancy}</td>
                    </tr>
                    <tr className="table-primary">
                        <td>Weight</td>
                        <td>Max</td>
                        <td>{cats.max_weight}</td>
                    </tr>
                    
                </tbody>

            </table>


        </>


    );
}