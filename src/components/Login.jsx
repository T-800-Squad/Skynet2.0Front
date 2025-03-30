import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../images/logo.png';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Reemplaza history.push

    const loginUser = (e) => {
        e.preventDefault();
        navigate('/home'); // Usa navigate en lugar de history.push
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-6">
                    <img src={logo} alt="Logo" />
                    <h3>Login</h3>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-success" onClick={loginUser}>
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
