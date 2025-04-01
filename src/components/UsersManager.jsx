import React, { useState } from 'react';
import BookingService from '../services/BookingService'; // Asegúrate de que la ruta sea correcta
import '../styles/Login.css'; // Importa el CSS existente

const UsersManager = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [errorCreate, setErrorCreate] = useState('');
    const [successCreate, setSuccessCreate] = useState('');
    const [errorDelete, setErrorDelete] = useState('');
    const [successDelete, setSuccessDelete] = useState('');
    const [userToDelete, setUserToDelete] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorCreate('');
        setSuccessCreate('');

        const createUserDTO = {
            username,
            password,
            email,
            role
        };

        try {
            await BookingService.createUser(createUserDTO);
            setSuccessCreate('Usuario creado exitosamente');
            setUsername('');
            setPassword('');
            setEmail('');
            setRole('');
        } catch (err) {
            setErrorCreate('Error al crear el usuario: ' + err.message);
        }
    };

    const handleDeleteUser = async (e) => {
        e.preventDefault();
        setErrorDelete('');
        setSuccessDelete('');

        if (confirmDelete) {
            try {
                await BookingService.deleteUser(userToDelete); // Ahora usamos el método correcto
                setSuccessDelete('Usuario eliminado exitosamente');
                setUserToDelete('');
                setConfirmDelete(false);
            } catch (err) {
                setErrorDelete('Error al eliminar el usuario: ' + err.message);
            }
        } else {
            setConfirmDelete(true);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-6">
                    <h3>Crear Usuario</h3>
                    <div className="card-body">
                        {errorCreate && <div className="alert alert-danger">{errorCreate}</div>}
                        {successCreate && <div className="alert alert-success">{successCreate}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username:</label>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
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
                                    required
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label>Role:</label>
                                <input
                                    type="text"
                                    placeholder="Role"
                                    className="form-control"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
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

            {/* Nueva fila para la sección de eliminar usuario */}
            <div className="row justify-content-center mt-4">
                <div className="card col-md-6">
                    <h3>Eliminar Usuario</h3>
                    <div className="card-body">
                        {errorDelete && <div className="alert alert-danger">{errorDelete}</div>}
                        {successDelete && <div className="alert alert-success">{successDelete}</div>}
                        <form onSubmit={handleDeleteUser}>
                            <div className="form-group">
                                <label>Nombre de Usuario:</label>
                                <input
                                    type="text"
                                    placeholder="Nombre de Usuario"
                                    className="form-control"
                                    value={userToDelete}
                                    onChange={(e) => setUserToDelete(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success">
                                {confirmDelete ? '¿Estás seguro? Haz clic en eliminar de nuevo' : 'Eliminar Usuario'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersManager;
