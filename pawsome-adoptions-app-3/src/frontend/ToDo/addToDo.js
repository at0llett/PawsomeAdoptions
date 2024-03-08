import React from "react";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";




const AddToDo = () => {    
    const navigate = useNavigate();
    const [status, setStatus] = useState('Incomplete');

    const [tasks, setTasks] = useState({
        title: "",
        description: "",
        due_date: "",
        status: status,
        task_id: "",
        user_id: ""
    });

    const handleChange = (e) => {
        setTasks((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    };

    const handleSubmit= async (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: tasks.title,
                description: tasks.description,
                due_date: tasks.due_date,
                status: tasks.status,
                task_id: tasks.task_id,
                user_id: tasks.user_id
            })    
        });
        navigate("/todo");

    };

    return (
        <div className="card border-success mb-3" style={{maxWidth: 100 + 'rem'}}>
        <div className="card-header"><h2 className="w-100 d-flex justify-content-center p-3">Add A New Task</h2></div>
        <div className="card-body">

            <div className='row'>
                <div className='col-md-12'>
                    <form onSubmit={handleSubmit}>
                    <p></p> 
                    <div className="mb-3 mt-3">
                            <label>Title:</label>
                            <input type="text" className="form-control" placeholder="Title" name="title" onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Description:</label>
                            <input type="text" className="form-control" placeholder="Describe if needed..." name="description" onChange={handleChange} required />
                        </div>
                        {/* due date using a calender component */}
                        <div className="mb-3 mt-3">
                            <label>Due Date:</label>
                            <p>
                            <input type="date" name="due_date" defaultValue="2024-04-22" min="2024-03-01" max="2030-12-31"  onChange={handleChange} required/>                        
                            </p>
                        </div>
                        {/* status using dropdown selector */}
                        <div>
                            <label>Status:</label>
                            <select className="form-select"  defaultValue={status} name="status" onChange={handleChange} required>
                                <option value="Incomplete">Incomplete</option>
                                <option value="Complete">Complete</option>
                            </select>
                        </div>

                        {/* Eventually hide IDs from user */}
                        <div className="mb-3 mt-3">
                            <label>Task ID Testing:</label>
                            <input type="number" min="1" max="300" step="1"  className="form-control" placeholder="Task ID #" name="task_id" onChange={handleChange} required />
                        </div>
                        <div className="mb-3 mt-3">
                            <label>User ID Testing:</label>
                            <input type="number" min="1" max="300" step="1" className="form-control" placeholder="User ID #" name="user_id" onChange={handleChange} required />
                        </div>



                        <button type="submit" className="btn btn-primary" style={{width: 35 + 'rem'}}>Add Task</button> 
                        <p></p>
                        <Link to={`/todo`} className="btn btn-dark">Back</Link>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default AddToDo;