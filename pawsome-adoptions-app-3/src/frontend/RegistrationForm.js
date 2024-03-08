import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
  });

  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // get all the current users to check if username already exists

  useEffect(() => {
      fetch('http://localhost:3001/register')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error Fetching To Do List:', error);
      });

  }, []);

  // Checks if the username already exists in the database, if so then return false
  function checkUser() {
    console.log('users grabbed', users);    // for testing
    console.log(formData.username);
    console.log(formData.email);
    console.log("Database:");

    for (let i = 0; i < users.length; i++) {

      console.log(users[i].username);    // for testing
      console.log(users[i].email);

      if (formData.username === users[i].username) {
        window.alert("This username already being used.");
        return true;
      }
      if (formData.email === users[i].email) {
        window.alert("This email already being used.");
        return true;
        
      }
    }
    return false;
  };

  const handleSubmit = async (e) => {

    if (checkUser() === false) {
      e.preventDefault();

      fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          name: formData.name
        })
      });
      navigate("/todo");
    } else {
      navigate("/register");

    }
  };

  return (
    <div className="card border-dark mb-3" style={{ maxWidth: 25 + 'rem' }}>
      <div className="card-header"><h1>Register Now!</h1></div>
      <div className="card-body">

        <form onSubmit={handleSubmit} className="form-container">

          <div className="form-group">
            <label className="form-label mt-4"> Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label mt-4">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              autoComplete="off"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label mt-4"> First Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter first name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label mt-4">Email address</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>

          <button type="submit" className="btn btn-secondary">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;