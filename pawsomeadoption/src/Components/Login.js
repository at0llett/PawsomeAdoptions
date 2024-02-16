import React, { useState } from "react";
import './Login.css';




export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });
        setEmail("");
        setPassword("");
    };

    return (

        <>
            <main className='login'>
                

                <img src={process.env.PUBLIC_URL + 'images/logo_white.png'} alt="Logo" style={{ width: '200px', height: '200px' }} />
                <h1 className='loginTitle'>Log into your account</h1>


                <div className="card border-dark mb-3" style={{maxWidth: 20 + 'rem'}}>
                    <div className="card-body">
                        <form className='loginForm' onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="exampleInputEmail1" className="form-label mt-4">Email address</label>
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
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1" className="form-label mt-4">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="exampleInputPassword1" 
                                    placeholder="Password" 
                                    autocomplete="off"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" class="btn btn-primary">SIGN IN</button>
                            <p>
                                Don't have an account? {/*have this link to some registration page */}
                            </p>
                        </form>
                    </div>
                </div>

                
            </main>
        </>

    )


}