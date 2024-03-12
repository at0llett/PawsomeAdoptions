import React from "react";
import { useState, useEffect } from "react";
import {Link, useNavigate, useParams } from "react-router-dom";




const UpdateToDo = () => {   
    const navigate = useNavigate();
    const { task_id, username } = useParams();
    const [status, setStatus] = useState('Incomplete');
    const [task, setTask] = useState({
        title: "",
        description: "",
        due_date: "",
        status: "",
        task_id: "",
        user_id: "",

    });
    const [formTask, setFormTask] = useState({
        title: "",
        description: "",
        due_date: "",
        status: status,
        task_id: task_id,
    });

    // gets the current information for the task being updated
    useEffect(() => {
        if (username !== null) {
            fetch('http://localhost:3001/todo/' + task_id + '/' + username)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setTask(data);
            })
            .catch(error => {
                console.error('Error Fetching To Do List:', error);
            });
        }

    }, [task]);

 
    const handleChange = (e) => {
        setFormTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/todo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: formTask.title,
                description: formTask.description,
                due_date: formTask.due_date,
                status: formTask.status,
                task_id: task_id
            })    
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })

        
        navigate("/todo/" + username);
    };

    return (
        <div>
            <div className="card border-info mb-3" style={{maxWidth: 30 + 'rem'}}>

                {task.length > 0 ? (
                <div>
                    <div className="card-header">
                        <h1 className="w-100 d-flex justify-content-center p-3">{task[0].title}</h1>
                    </div>
                
                    <div className="card-body">
                        <p>{task[0].due_date}</p>
                        <p>{task[0].description}</p>
                        <p>{task[0].status}</p>

                    </div>
                </div>
                ) : (
                    <p>nothing</p>
                )}
            </div>

            <div className="card border-info mb-3" style={{maxWidth: 30 + 'rem'}}>
                <div className="card-header">
                    <h2 className="w-100 d-flex justify-content-center p-3">Edit Task</h2>
                </div>
            
                <div className="card-body">
                    <div className='row'>
                        <div className='col-md-12'>
                            <form onSubmit={handleSubmit}>
                                <p></p> 
                                
                                <div className="mb-3 mt-3">
                                    <label>Title:</label>
                                    <input type="text" className="form-control" placeholder="Title" name="title" onChange={handleChange} required />
                                </div>
                                <div className="mb-3 mt-3">
                                    <label>Description:</label>
                                    <input type="text" className="form-control" placeholder="Describe if needed..." name="description" onChange={handleChange} required />
                                </div>
                            
                                {/* status using dropdown selector */}
                                <div className="mb-3 mt-3">
                                    <label>Status:</label>
                                    <select className="form-select"  defaultValue={status} name="status" onChange={handleChange} required>
                                        <option value="Incomplete">Incomplete</option>
                                        <option value="Complete">Complete</option>
                                    </select>
                                </div>

                                {/* due date using a calender component */}
                                <div className="mb-3 mt-3">
                                    <label>Due Date:</label>
                                    <p>
                                    <input type="date" name="due_date" defaultValue="2024-04-22" min="2024-03-01" max="2030-12-31"  onChange={handleChange} required/>                        
                                    </p>
                                </div>
                                
                                <button type="submit" className="btn btn-primary" style={{width: 28 + 'rem'}}>Submit Changes</button> 
                                <p>
                                <Link to={`/todo/` + username} className="btn btn-dark">Back</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    );
};

export default UpdateToDo;