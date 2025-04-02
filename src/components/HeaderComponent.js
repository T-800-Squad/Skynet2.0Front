import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HeaderComponent = () => (
    <nav className="navbar navbar-dark bg-success fixed-top px-3 py-0">
        <a href="/home" className="navbar-brand">LabTools</a>
        <button className="btn btn-outline-light text-white btn-sm" onClick={() => window.location.href = "/login"}>
            Cerrar sesión
        </button>
    </nav>
);

export default HeaderComponent;
