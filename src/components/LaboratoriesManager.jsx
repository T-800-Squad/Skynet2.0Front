import React, { useState } from 'react';
import BookingService from '../services/BookingService'; // Asegúrate de que la ruta sea correcta
import '../styles/Login.css'; // Importa el CSS existente

const LaboratoriesManager = () => {
    const [labName, setLabName] = useState('');
    const [errorCreate, setErrorCreate] = useState('');
    const [successCreate, setSuccessCreate] = useState('');
    const [errorDelete, setErrorDelete] = useState('');
    const [successDelete, setSuccessDelete] = useState('');
    const [labToDelete, setLabToDelete] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleCreateLab = async (e) => {
        e.preventDefault();
        setErrorCreate('');
        setSuccessCreate('');

        try {
            await BookingService.createLaboratory(labName);
            setSuccessCreate('Laboratorio creado exitosamente');
            setLabName('');
        } catch (err) {
            setErrorCreate('Error al crear el laboratorio: ' + err.message);
        }
    };

    const handleDeleteLab = async (e) => {
        e.preventDefault();
        setErrorDelete('');
        setSuccessDelete('');

        if (confirmDelete) {
            try {
                await BookingService.deleteLaboratory(labToDelete);
                setSuccessDelete('Laboratorio eliminado exitosamente');
                setLabToDelete('');
                setConfirmDelete(false);
            } catch (err) {
                setErrorDelete('Error al eliminar el laboratorio: ' + err.message);
            }
        } else {
            setConfirmDelete(true);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-6">
                    <h3>Crear Laboratorio</h3>
                    <div className="card-body">
                        {errorCreate && <div className="alert alert-danger">{errorCreate}</div>}
                        {successCreate && <div className="alert alert-success">{successCreate}</div>}
                        <form onSubmit={handleCreateLab}>
                            <div className="form-group">
                                <label>Nombre del Laboratorio:</label>
                                <input
                                    type="text"
                                    placeholder="Nombre del Laboratorio"
                                    className="form-control"
                                    value={labName}
                                    onChange={(e) => setLabName(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success">
                                Crear Laboratorio
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Nueva fila para la sección de eliminar laboratorio */}
            <div className="row justify-content-center mt-4">
                <div className="card col-md-6">
                    <h3>Eliminar Laboratorio</h3>
                    <div className="card-body">
                        {errorDelete && <div className="alert alert-danger">{errorDelete}</div>}
                        {successDelete && <div className="alert alert-success">{successDelete}</div>}
                        <form onSubmit={handleDeleteLab}>
                            <div className="form-group">
                                <label>Nombre del Laboratorio:</label>
                                <input
                                    type="text"
                                    placeholder="Nombre del Laboratorio"
                                    className="form-control"
                                    value={labToDelete}
                                    onChange={(e) => setLabToDelete(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success">
                                {confirmDelete ? '¿Estás seguro? Haz clic en eliminar de nuevo' : 'Eliminar Laboratorio'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaboratoriesManager;
