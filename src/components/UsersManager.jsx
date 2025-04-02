import React, { useState } from 'react';
import BookingService from '../services/BookingService'; 
import '../styles/Login.css'; 

const UsersManager = () => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [correo, setCorreo] = useState('');
    const [rol, setRol] = useState('');
    const [errorCrear, setErrorCrear] = useState('');
    const [exitoCrear, setExitoCrear] = useState('');
    const [errorEliminar, setErrorEliminar] = useState('');
    const [exitoEliminar, setExitoEliminar] = useState('');
    const [usuarioEliminar, setUsuarioEliminar] = useState('');
    const [confirmarEliminar, setConfirmarEliminar] = useState(false);

    const handleCrearUsuario = async (e) => {
        e.preventDefault();
        setErrorCrear('');
        setExitoCrear('');

        const nuevoUsuario = {
            username: usuario,
            password: contraseña,
            email: correo,
            role: rol
        };

        try {
            await BookingService.createUser(nuevoUsuario);
            setExitoCrear('Usuario creado exitosamente');
            setUsuario('');
            setContraseña('');
            setCorreo('');
            setRol('');
        } catch (err) {
            setErrorCrear('Error al crear el usuario: ' + err.message);
        }
    };

    const handleEliminarUsuario = async (e) => {
        e.preventDefault();
        setErrorEliminar('');
        setExitoEliminar('');

        if (confirmarEliminar) {
            try {
                await BookingService.deleteUser(usuarioEliminar);
                setExitoEliminar('Usuario eliminado exitosamente');
                setUsuarioEliminar('');
                setConfirmarEliminar(false);
            } catch (err) {
                setErrorEliminar('Error al eliminar el usuario: ' + err.message);
            }
        } else {
            setConfirmarEliminar(true);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-6">
                    <h3>Crear Usuario</h3>
                    <div className="card-body">
                        {errorCrear && <div className="alert alert-danger">{errorCrear}</div>}
                        {exitoCrear && <div className="alert alert-success">{exitoCrear}</div>}
                        <form onSubmit={handleCrearUsuario}>
                            <div className="form-group">
                                <label>Usuario:</label>
                                <input
                                    type="text"
                                    placeholder="Nombre de usuario"
                                    className="form-control"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label>Contraseña:</label>
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    className="form-control"
                                    value={contraseña}
                                    onChange={(e) => setContraseña(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label>Correo Electrónico:</label>
                                <input
                                    type="email"
                                    placeholder="Correo electrónico"
                                    className="form-control"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label>Rol:</label>
                                <input
                                    type="text"
                                    placeholder="Rol"
                                    className="form-control"
                                    value={rol}
                                    onChange={(e) => setRol(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success">
                                Crear Usuario
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center mt-4">
                <div className="card col-md-6">
                    <h3>Eliminar Usuario</h3>
                    <div className="card-body">
                        {errorEliminar && <div className="alert alert-danger">{errorEliminar}</div>}
                        {exitoEliminar && <div className="alert alert-success">{exitoEliminar}</div>}
                        <form onSubmit={handleEliminarUsuario}>
                            <div className="form-group">
                                <label>Nombre de Usuario:</label>
                                <input
                                    type="text"
                                    placeholder="Nombre de usuario"
                                    className="form-control"
                                    value={usuarioEliminar}
                                    onChange={(e) => setUsuarioEliminar(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success">
                                {confirmarEliminar ? '¿Estás seguro? Haz clic en eliminar de nuevo' : 'Eliminar Usuario'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersManager;
