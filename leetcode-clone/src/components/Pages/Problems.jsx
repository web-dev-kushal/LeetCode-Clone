/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

function Problems() {
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);
    console.log(problems);

    async function getProblems() {
        const req = await fetch('http://localhost:3000/api/problems', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await req.json();
        setProblems(data.problems);
    }

    // //We need to verify if the user  has logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwt_decode(token);
            console.log(user);
            if (!user) {
                localStorage.removeItem('token');
                navigate('/auth');
            } else {
                getProblems()
            }
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div style={{ display: "flex", gap: "20px", margin: "30px" }}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col">Title</th>
                            <th scope="col">Acceptance</th>
                            <th scope="col">Difficulty</th>
                            <th scope="col">Frequency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems ? (problems.map((prob) => (
                                <tr>
                                    <th scope="row">
                                        <img style={{ height: "20px", objectFit: "cover" }} src="https://th.bing.com/th/id/R.900aa6dba82b1d2045cf668b6bacce3c?rik=7%2fgZkORD%2fEoTww&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fgreen-check-mark-transparent-background%2fgreen-check-mark-transparent-background-5.png&ehk=fOIIwZOeTl1QyjWokhQJZZ0l5cZ0byPJlEs44khMyAA%3d&risl=&pid=ImgRaw&r=0"></img>
                                    </th>
                                        <td><Link to={`/editor/:${prob.problemId}`}>{prob.title}</Link></td>
                                    <td>{prob.acceptance}</td>
                                    <td>{prob.difficulty}</td>
                                    <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                                    </svg></td>
                                </tr>
                            ))) : (
                                <p>Loading...</p>
                            ) 
                            }
                    </tbody>
                </table>
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">Session</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Problems;