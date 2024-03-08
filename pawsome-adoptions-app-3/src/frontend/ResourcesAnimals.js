export default function ResourcesAnimals({ animals }) {
    return (

        <>
            <h3>{animals.name}</h3>

            <table className="table table-hover" style={{ width: '380px', margin: 'auto' }}>
                <thead>
                    <tr>
                        <th scope="col" style={{ fontSize: '20px' }}>Features</th>
                        <th scope="col" style={{ fontSize: '20px' }}>Info</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="table-info">
                        <td>Location</td>
                        <td>{animals.characteristics.location}</td>
                    </tr>
                    <tr className="table-dark">
                        <td>Prey</td>
                        <td>{animals.characteristics.prey}</td>
                    </tr>

                    <tr className="table-info">
                        <td>Estimated Population Size</td>
                        <td>{animals.characteristics.estimated_population_size}</td>
                    </tr>
                    <tr className="table-dark">
                        <td>Biggest Threat</td>
                        <td>{animals.characteristics.biggest_threat}</td>
                    </tr>

                    <tr className="table-info">
                        <td>Diet</td>
                        <td>{animals.characteristics.diet}</td>
                    </tr>
                    <tr className="table-dark">
                        <td>Life Span</td>
                        <td>{animals.characteristics.lifespan}</td>
                    </tr>

                    <tr className="table-primary">
                        <td>Group</td>
                        <td>{animals.characteristics.group}</td>
                    </tr>
                    <tr className="table-primary">
                        <td>Weight</td>
                        <td>{animals.characteristics.weight}</td>
                    </tr>

                </tbody>

            </table>
        </>


    );
}