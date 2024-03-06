import { useEffect } from "react";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

// export default function Documentation = () => <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" />

export default function Documentation() {

    useEffect(() => {
        window.location.href = `http://localhost:3001/api-docs`;
    })

    return (

        <>
            {/* <SwaggerUI url="http://localhost:3001/api-docs" /> */}
        </>

    );
}