import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { name, email, password, confirmPassword };
        console.log(user);
        fetch('http://localhost:8080/register', {
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
            console.error("Error during register:", error);
            setError("An unexpected error occurred. Please try again later.");

        })
        
        
       
    }

    return (
        <div className="outer-container">
            <div className="container">
                <div className="login-form">
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Enter your name" required value={name} onChange={(e) => setName(e.target.value)} /> <br />
                        <input type="text" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                        <input type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                        <input type="password" placeholder="Re-enter your password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /> <br />
                        <button>Register</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </div>
                <div className="bg-login"></div>
            </div>
        </div>
    );
}

export default Register;