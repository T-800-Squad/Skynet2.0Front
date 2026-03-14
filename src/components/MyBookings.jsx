import React, { Component } from 'react';
import BookingService from '../services/BookingService';
import '../styles/MyBookings.css'; 

class MyBookings extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            bookings: [],
            customUser: "",
            isAdmin: false
        };
    }

    async componentDidMount() {
        const role = localStorage.getItem("rol");
        this.setState({ isAdmin: role === "Admin" }, this.fetchBookings);
    }
    
    fetchBookings = async () => {
        try {
            const userName = this.state.customUser.trim() !== "" ? this.state.customUser : localStorage.getItem("userName");
            const response = this.state.isAdmin && this.state.customUser.trim() !== "" 
                ? await BookingService.getBookingByAdmin(userName) 
                : await BookingService.getBookingByUser();
            this.setState({ bookings: response || [] });
        } catch (error) {
            console.error("Error al obtener las reservas:", error);
        }
    };

    deleteBooking = async (id) => {
        const userName = this.state.customUser.trim() !== "" ? this.state.customUser : localStorage.getItem("userName");
        let deleteDTO = { userName, bookingId: id };
    
        try {
            await BookingService.deleteBooking(deleteDTO);
            this.setState((prevState) => ({ bookings: prevState.bookings.filter(booking => booking.bookingId !== id) }));
        } catch (error) {
            console.error("Error eliminando la reserva:", error);
        }
    };
    

    handleUserChange = (e) => {
        this.setState({ customUser: e.target.value });
    };

    render() {
        return (
            <div className="my-bookings-container">
                <h2 className="text-center">Mis Reservas</h2>
                {this.state.isAdmin && (
                    <div>
                        <label>Ingrese nombre de usuario (opcional):</label>
                        <input
                            type="text"
                            placeholder="Ingrese el nombre de usuario"
                            value={this.state.customUser}
                            onChange={this.handleUserChange}
                            className="form-control"
                        />
                        <button className="btn btn-success mt-2" onClick={this.fetchBookings}>Obtener Reservas</button>
                    </div>
                )}
                {this.state.bookings.length === 0 ? (
                    <p>No hay reservas disponibles.</p>
                ) : (
                    <div className="row">
                        <table className="table table-striped table-bordered mt-4">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre del Laboratorio</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.bookings.map(booking => (
                                    <tr key={booking.bookingId}>
                                        <td>{booking.bookingId}</td>
                                        <td>{booking.labName}</td>
                                        <td>{booking.date}</td>
                                        <td>
                                            <div className="button-group">
                                                <button onClick={() => this.deleteBooking(booking.bookingId)} className="btn btn-success btn-sm">Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }
}

export default MyBookings;
