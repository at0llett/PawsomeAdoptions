import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



// Allow users to organize a to-do list regarding pets; also include 
// emergency contact; GET/POST/PUT/DELETE
const ToDo = () => {
    const [tasks, setTasks] = useState([]);

    // const updateTasks = (newTasks) => {
    //     setTasks(newTasks);
    // };

    const handleDelete = async (task_id) => {
        
        const deleteConfirmed = window.confirm('Are you sure about the deletion of this record permanently from the database?');
        if (deleteConfirmed) {
            fetch('http://localhost:3001/todo', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    task_id: task_id
                })    
            }) 
            .then(response => response.json())
            .then(data => {
                setTasks(data); // Update the state with the fetched data
            });
        }

    };

    useEffect(() => {
        fetch('http://localhost:3001/todo')
            .then(response => response.json())
            .then(data => {
                setTasks(data);
            })
            .catch(error => {
                console.error('Error Fetching To Do List:', error);
            });
    }, []);

    return (
        // card border and header
        <div class="card border-primary mb-3" style={{minWidth: 70 + 'rem'}}>
        <div class="card-header"> 
            <h2 className="w-100 d-flex justify-content-center p-3">To Do List</h2>
            {/* add to list */}
            <Link to={`/addtodo`} className="btn btn-success" style={{width: 35 + 'rem'}}>Add</Link>&nbsp;&nbsp;
        </div>
        <div class="card-body">
      
       

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
                                                <Link to={`/updatetodo/${task.task_id}`} className="btn btn-info">Edit</Link>&nbsp;&nbsp; 
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
                            <h3>Nothing To Do.</h3>
                        </div>
                    )}
                    </div>
            </div>
            {/* <Link className="btn btn-dark"  to="/">Return</Link> */}
        </div >
        </div>
        </div>
    );



};

export default ToDo;