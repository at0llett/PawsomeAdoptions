import React from "react";
import { useState, useEffect } from "react";
import {Link, useNavigate, useParams } from "react-router-dom";




const UpdateToDo = () => {   
    const navigate = useNavigate();
    const { task_id } = useParams();
    const [status, setStatus] = useState('Incomplete');
    const [formTask, setFormTask] = useState({
        title: "",
        description: "",
        due_date: "",
        status: status,
        task_id: task_id
    });

    // useEffect(() => {
    //     // axios.get("http://localhost:2000/task/" + task_id)
    //     //     .then((res) => {
    //     //         setTasks(res.data[0]);
    //     //     })
    //     //     .catch((err) => console.log("Error: ", err));
    // }, [task_id]);

 
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
        // .then(() => {
        //     fetch('http://localhost:3001/todo')
        //         .then(response => response.json())
        //         .then(data => {
        //             updateLostFound(data);
        //         })
        //         .catch(error => {
        //             console.error('Error fetching quotes:', error);
        //         });
        //  })
        
        navigate("/todo");
    };

    return (
        <div className="card border-info mb-3" style={{maxWidth: 100 + 'rem'}}>
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
                        
                        <button type="submit" className="btn btn-primary" style={{width: 35 + 'rem'}}>Submit Changes</button> 
                        <p>
                        <Link to={`/todo`} className="btn btn-dark">Back</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default UpdateToDo;