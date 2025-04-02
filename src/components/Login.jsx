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
            console.log("🔄 Iniciando sesión con:", { email, password });

            const response = await BookingService.login({ email, password });
            if (!response || !response.token) {
                setError('Error de autenticación. Inténtalo de nuevo.');
                return;
            }

            console.log("✅ Respuesta del servidor:", response);

            const { token, name: userName, rol } = response;
            console.log("🔑 Token recibido:", token);

            BookingService.setToken(token);
            localStorage.setItem('userName', userName);
            localStorage.setItem('rol', rol);

            console.log("✅ Credenciales guardadas, redirigiendo...");
            navigate('/home'); 
        } catch (err) {
            console.error("⚠️ Error en login:", err.response?.data || err.message);
            setError('Correo o contraseña incorrectos. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-6">
                    <img src={logo} alt="Logo" />
                    <h3>Iniciar Sesión</h3>
                    <div className="card-body">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={loginUser}>
                            <div className="form-group">
                                <label>Correo Electrónico:</label>
                                <input
                                    type="email"
                                    placeholder="Ingrese su correo"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label>Contraseña:</label>
                                <input
                                    type="password"
                                    placeholder="Ingrese su contraseña"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success">
                                Iniciar Sesión
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
