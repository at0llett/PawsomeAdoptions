import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
// import { useParams, useNavigate, Link } from "react-router-dom";


// Allow users to organize a to-do list regarding pets; also include 
// emergency contact; GET/POST/PUT/DELETE
const ToDo = () => {
    // const { list_id } = useParams();
    const [tasks, setTasks] = useState([]);
    // const navigate = useNavigate();

    // const [favorites, setFavorites] = useState([]);

    const updateTasks = (newTasks) => {
        setTasks(newTasks);
    };

    // const handleDelete = async (list_id) => {
    //     const deleteConfirmed = window.confirm('Are you sure about the deletion of this record permanently from the database?');
    //     if (deleteConfirmed) {
    //         try {
    //             await axios.delete('http://localhost:2000/task/' + list_id);
    //             window.location.reload()
    //         } catch (err) {
    //             console.log("Error:" + err);
    //         }
    //     } 
    // };

    useEffect(() => {
        fetch('http://localhost:3001/task')
            .then(response => response.json())
            .then(data => {
                setTasks(data);
            })
            .catch(error => {
                console.error('Error Fetching To Do List:', error);
            });
    }, []);

    return (
        <div className="container">
            <h2 className="w-100 d-flex justify-content-center p-3">To Do List</h2>
            <div className='row'>
                <div className='col-md-12'>
                    {tasks.length > 0 ? (
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Testing Task ID</th>
                                <th>Testing User ID</th>

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map((task, c) => {
                                    return (
                                        <tr key={c}>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>{task.due_date}</td>
                                            <td>{task.status}</td>
                                            <td>{task.task_id}</td>
                                            <td>{task.user_id}</td>

                                            {/* <td>
                                                <Link to={`/updatetask/${task.task_id}`} className="btn btn-info">Edit</Link>&nbsp;&nbsp;
                                                <Link onClick={()=>handleDelete(task.task_id)} className="btn btn-danger">Delete</Link>
                                            </td> */}
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
    );



};

export default ToDo;