// import Adoption from "./Adoption";
import Adopt from "./Adopt";
import Quotes from "./Quotes";

export default function Home() {

    const goToPage = () => {
        window.location.href = window.location + "adopt";
    };


    return (
        <>
            <h1 className="text-secondary">Adopt Today!</h1>

            <div style={{border: '4px solid white', padding: '10px', width: '800px', justifyContent: 'center', alignItems: 'center', margin:'auto'}}>
                <div style={{justifyContent: 'center', alignItems: 'center'}}>
                    <img src={process.env.PUBLIC_URL + 'images/01.jpg'} style={{ width: '220px', height: '300px', marginTop: '150px' }} alt="cat"></img>
                    <img src={process.env.PUBLIC_URL + 'images/02.jpg'} style={{ width: '220px', height: '300px', marginTop: '20px', marginLeft: '50px', marginRight: '50px' }} alt="cat"></img>
                    <img src={process.env.PUBLIC_URL + 'images/03.jpg'} style={{ width: '220px', height: '300px', marginTop: '150px' }} alt="cat"></img>
                </div>

                <button className="btn btn-secondary btn-lg" onClick={goToPage}>Adopt</button>

            </div>

            <Quotes />

        </>
    );
}