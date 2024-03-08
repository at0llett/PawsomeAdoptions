export default function ResourcesDog({ dogs }) {
    return (

        <>
            <h3>{dogs.name}</h3>
            <img src={dogs.image_link} alt="dog" style={{ width: '380px', height: '300px' }} />

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
                        <td>Shedding</td>
                        <td>1: None, 5: Max</td>
                        <td>{dogs.shedding}</td>
                    </tr>
                    <tr className="table-dark">
                        <td>Drooling</td>
                        <td>1: None, 5: Max</td>
                        <td>{dogs.drooling}</td>
                    </tr>
                    <tr className="table-info">
                        <td>Good With Strangers</td>
                        <td>1: Bad, 5: Good</td>
                        <td>{dogs.good_with_strangers}</td>
                    </tr>
                    <tr className="table-dark">
                        <td>Protectiveness</td>
                        <td>1: Min, 5: Max</td>
                        <td>{dogs.protectiveness}</td>
                    </tr>
                    <tr className="table-info">
                        <td>Energy</td>
                        <td>1: Low, 5: High</td>
                        <td>{dogs.energy}</td>
                    </tr>
                    <tr className="table-dark">
                        <td>Trainability</td>
                        <td>1: Difficult, 5: Easy</td>
                        <td>{dogs.trainability}</td>
                    </tr>
                    <tr className="table-primary">
                        <td>Weight Female</td>
                        <td>Max</td>
                        <td>{dogs.max_weight_female}</td>
                    </tr>
                    <tr className="table-primary">
                        <td>Weight Male</td>
                        <td>Max</td>
                        <td>{dogs.max_weight_male}</td>
                    </tr>
                </tbody>

            </table>

        </>


    );
}