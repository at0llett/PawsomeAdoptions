import React, { useState } from "react";
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });   

        // implement backend connection later

        setEmail("");
        setPassword("");
    };

    return (

        <>
            <main className='login'>
                <p></p>
                <h1 className='loginTitle'>Log into your account</h1>
                <div className="card border-dark mb-3" style={{width: 20 + 'rem'}}>
                    <div className="card-body">
                        <form className='loginForm' onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label mt-4">Email address</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Enter email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label mt-4">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="exampleInputPassword1" 
                                    placeholder="Password" 
                                    autoComplete="off"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">SIGN IN</button>
                            <p>
                            <a href="/register">Don't have an account?</a>
                            </p>
                        </form>
                    </div>
                </div>

                <img src={process.env.PUBLIC_URL + '/Images/logo-white.png'} alt="Logo" style={{ width: '200px', height: '200px' }} />

            </main>
        </>

    )


}