export default function ServicesTable({ service }) {
    return (

        <>

            <tr class="table-active">
                <td>{service.service}</td>
                <td>{service.description}</td>
                <td>{service.zip}</td>
                <td><a href={service.link}>Link</a></td>
            </tr>


        </>


    );
}