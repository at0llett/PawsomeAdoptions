import React from 'react';
import 'bootswatch/dist/vapor/bootstrap.min.css';


export default function Navigation() {

    return (
        <>

            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">PawsomeAdoptions</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link active" href="/">Home
                                    <span className="visually-hidden">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/lost">Lost&Found</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/adopt">Adoption</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/account">My Account</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/quotes">Quotes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/resources">Resources</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/reviews">SuccessStories</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/services">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/trivia">Trivia</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/documentation">Documentation</a>
                            </li>
                         </ul>   
                    </div>
                </div>
            </nav>

        </>
    );
}