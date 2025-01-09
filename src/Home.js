import { CiSquarePlus } from "react-icons/ci";

import { useState, useEffect } from 'react';

const Home = () => {
    const websiteUrl = process.env.REACT_APP_URL;
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserInfo = async () => {

            if (!userId || !token) {
                console.log("User ID or token not found in localStorage");
                return;
            }

            console.log(`Fetching user info with userId: ${userId} and token: ${token}`);

            try {
                const response = await fetch(`${websiteUrl}/user-info/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include token in request
                        'Content-Type': 'application/json',
                    },
                });

                console.log("Fetch response:", response);

                if (!response.ok) {
                    console.log(`HTTP error! status: ${response.status}`);
                    setError("Failed to fetch user information.");
                    return;
                }

                const data = await response.json();
                if (data.success) {
                    setUser(data.result);
                    setUsername(data.result.name);
                    console.log("User info set:", user);
                } else {
                    setError(data.message);
                    console.log("API error message:", data.message);
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
                setError("An unexpected error occurred. Please try again later.");
            }
        };

        fetchUserInfo();
    }, []);




    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${websiteUrl}/project/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    const data = await response.json(); 
                    console.log("Fetched projects data:", data);
    
                    if (data.success) {
                        setProjects(data.projects); 
                    } else {
                        console.error("Error fetching projects:", data.message);
                    }
                } else {
                    console.error("Failed to fetch projects. HTTP Status:", response.status);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
    
        fetchProjects();
    }, []);
    

    return (
        <div>
            <div className="container-home">
                <header className="dashboard-header">
                    <h1>Welcome, {username}</h1>
                    <h2>Let's get started!</h2>
                </header>
                <div className="cards-container">
                    <div className="card">
                        <h3>Create a Project</h3>
                        <p>Start a brand-new project from scratch</p>
                        <div className="icon-wrapper">
                            <CiSquarePlus size={150} className="add-icon" />
                        </div>
                    </div>

                    <div className="card">
                        <h3>Start an Existing Project</h3>
                        <p>Select from your existing projects to continue where you left off.</p>
                        <ul className="project-list">
                            {projects.length > 0 ? (
                                projects.map((project) => (
                                    <li key={project.id}>{project.name}</li>
                                ))
                            ) : (
                                <p>No projects found.</p>
                            )}
                            <a href="/projects" className="view-all-projects">
                                View all projects
                            </a>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
