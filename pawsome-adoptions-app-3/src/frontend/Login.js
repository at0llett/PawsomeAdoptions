import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';


export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");             // for checking if user exists in DB
    const [password, setPassword] = useState("");       // for checking if user exists in DB
    const [users, setUsers] = useState([]);             // stores all user info for checking if user exists in DB
    let username = "";       // for routing to to do page

    useEffect(() => {
        fetch('http://localhost:3001/login')
        .then(response => response.json())
        .then(data => {
          setUsers(data);
        })
        .catch(error => {
          console.error('Error Fetching To Do List:', error);
        });
  
    }, []);

    // check if this email and password combination are in the database
    function checkUser() {
        // console.log('users grabbed', users);    // for testing
        // console.log(email);
        // console.log(password);
        // console.log("Database:");
    
        for (let i = 0; i < users.length; i++) {
            // console.log(users[i].email);
            // console.log(users[i].password);    // for testing

            if (email === users[i].email && password === users[i].password) {
                // console.log(users[i].username);
                username = users[i].username;
                return true;
            }
        }
        window.alert("This email or password is not in our system.");
        return false;
    };
    

    const handleSubmit = (e) => {
        if (checkUser() === true) {
            e.preventDefault();
            // console.log('/todo/' + username);   
            navigate('/todo/' + username);
        } else {
            navigate("/account");
        }
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