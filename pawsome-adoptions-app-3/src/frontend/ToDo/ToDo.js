import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// Allow users to organize a to-do list regarding pets; also include 
// emergency contact; GET/POST/PUT/DELETE
const ToDo = () => {
    const { username } = useParams();

    const [tasks, setTasks] = useState([]);

    const handleDelete = async (task_id) => {
        const deleteConfirmed = window.confirm('Are you sure about the deletion of this record permanently from the database?');
        if (deleteConfirmed) {
            fetch('http://localhost:3001/todo', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    task_id: task_id,
                    user_id: tasks[0].user_id
                })    
            }) 
            .then(response => response.json())
            .then(data => {
                setTasks(data); // Update the state with the fetched data
            });
        }
    };

    // get all the info for the user and their tasks
    useEffect(() => {
        if (username !== null) {
            fetch('http://localhost:3001/todo/' + username)
            .then(response => response.json())
            .then(data => {
                setTasks(data);
            })
            .catch(error => {
                console.error('Error Fetching To Do List:', error);
            });
        }

    }, [tasks]);

    return (
        <div>

            <p></p>
            <h1 style={{fontSize: 70 + 'px'}}>Welcome {username} !</h1>
            <div className="card border-primary mb-3" style={{width: 70 + 'rem'}}>
                <div className="card-header"> 
                    <h2 style={{fontSize: 50 + 'px'}} className="w-100 d-flex justify-content-center p-3">To Do List</h2>
                    {username !== null  ? (
                        <Link to={`/addtodo/` + username} className="btn btn-success" style={{width: 35 + 'rem'}}>Add</Link>
                    ):(    
                        <h3>Not signed in.</h3>
                    )}
                </div>
                <div className="card-body">
                    <div className="container">
                        <div className='row'>
                            <div className='col-md-12'>
                                {tasks.length > 0 ? (
                                <table className="table table-hover">
                                    <thead>
                                        <tr className="table-dark">
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Due Date</th>
                                            <th>Status</th>
                                            <th>Testing Task ID</th>
                                            <th>Testing User ID</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            tasks.map((task, c) => {
                                                return (
                                                    <tr className="table-dark" key={c}>
                                                        <td>{task.title}</td>
                                                        <td>{task.description}</td>
                                                        <td>{task.due_date}</td>
                                                        <td>{task.status}</td>
                                                        <td>{task.task_id}</td>
                                                        <td>{task.user_id}</td>
                                                        <td>
                                                            <Link to={`/updatetodo/${task.task_id}/${username}`} className="btn btn-info">Edit</Link>&nbsp;&nbsp; 
                                                            <Link onClick={()=>handleDelete(task.task_id)} className="btn btn-danger">Delete</Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                ) : (
                                    <div className='row'>
                                        <h4>Nothing To Do.</h4>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div >
                </div>
            </div>


            {/* Add more to "my account" page */}




        </div>
    );



};

export default ToDo;