import React, { Component } from 'react';
import '../styles/Home.css';
import calendarIcon from '../images/calendar-icon.jpg';
import bookingIcon from '../images/booking-icon.jpg';
import iconPerson from '../images/iconPerson.jpg';
import iconLaboratory from '../images/iconLaboratory.png';

class Home extends Component {
    logout = () => {
        this.props.history.push('/');
    };

    render() {
        const role = localStorage.getItem('rol');

        return (
            <div className="dashboard-container">
                <header className="text-center">
                    <h1>Inicio</h1>
                </header>

                <div className="menu">
                    {role === 'Admin' && (
                        <>
                            <a href="/usersManager" className="menu-item">
                                <img src={iconPerson} alt="Gestión de Usuarios" />
                                <p>Gestión de Usuarios</p>
                            </a>

                            <a href="/laboratoriesManager" className="menu-item">
                                <img src={iconLaboratory} alt="Gestión de Laboratorios" />
                                <p>Gestión de Laboratorios</p>
                            </a>
                        </>
                    )}

                    <a href="/booking" className="menu-item">
                        <img src={calendarIcon} alt="Gestión de Reservas" />
                        <p>Gestión de Reservas</p>
                    </a>

                    <a href="/mybookings" className="menu-item">
                        <img src={bookingIcon} alt="Mis Reservas" />
                        <p>Mis Reservas</p>
                    </a>
                </div>

                <footer>
                    <button onClick={this.logout}>Cerrar Sesión</button>
                </footer>
            </div>
        );
    }
}

export default Home;
