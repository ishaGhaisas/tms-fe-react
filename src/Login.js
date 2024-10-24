import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { email, password };

        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    navigate('/home')
                }
                else {
                    setError(data.message);
                    console.log(data.message);
                }
            }).catch(error => {
                console.error("Error during login:", error);
                setError("An unexpected error occurred. Please try again later.");

            })
    }

    return (
        <div className="outer-container">
            <div className="container">
                <div className="login-form">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button>Login</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}  

                    <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                </div>
                <div className="bg-login"></div>
            </div>
        </div>
    )
}

export default Login