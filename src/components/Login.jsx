import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../images/logo.png';
import BookingService from '../services/BookingService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            console.log("Enviando datos:", { email, password });
    
            const response = await BookingService.login({ email, password });
            console.log("🔍 Respuesta completa del servidor:", response);
    
            const { token, name: userName, rol } = response || {}; 
            console.log("✅ Token recibido:", token);
    
            if (token) {
                BookingService.setToken(token);
                localStorage.setItem('userName', userName);
                localStorage.setItem('rol', rol);
                console.log("Credenciales guardadas, redirigiendo a /home...");
    
                navigate('/home');
                setTimeout(() => {
                    if (window.location.pathname !== '/home') {
                        console.log("Forzando redirección...");
                        window.location.href = '/home';
                    }
                }, 500);
            } else {
                console.error("❌ No se recibió token en la respuesta");
                setError('Error de autenticación. Inténtalo de nuevo.');
            }
        } catch (err) {
            console.error("⚠️ Error en login:", err.response?.data || err.message);
            setError('Credenciales incorrectas. Inténtalo de nuevo.');
        }
    };
    
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-6">
                    <img src={logo} alt="Logo" />
                    <h3>Login</h3>
                    <div className="card-body">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={loginUser}>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                            <button type="submit" className="btn btn-success">
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
