import React, { Component } from 'react';
import BookingService from '../services/BookingService';
import '../styles/MyBookings.css'; 

class MyBookings extends Component {
    constructor(props) {
        super(props);
        this.state = { bookings: [] };
    }

    async componentDidMount() {
        try {
            const bookings = await BookingService.getBookingByUser();
            console.log("Bookings received:", bookings);
            this.setState({ bookings });
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    }
    

    deleteBooking = async (id) => {
        let deleteDTO = { userName: localStorage.getItem("userName"), bookingId: id };
        console.log("Intentando eliminar booking:", deleteDTO);
    
        try {
            const response = await BookingService.deleteBooking(deleteDTO);
            console.log("Respuesta del backend:", response);
    
            this.setState({ bookings: this.state.bookings.filter(booking => booking.bookingId !== id) });
            console.log("Booking eliminado con éxito.");
        } catch (error) {
            console.error("Error eliminando booking:", error);
        }
    };
    


    render() {
        console.log("Renderizando bookings:", this.state.bookings);

        return (
            <div className="my-bookings-container">
                <h2 className="text-center">My Bookings</h2>
                {this.state.bookings.length === 0 ? (
                    <p>No bookings available.</p>
                ) : (
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Laboratory Name</th>
                                    <th>Date</th>
                                    <th>Actions</th>
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
                                                <button onClick={() => this.deleteBooking(booking.bookingId)} className="btn btn-success btn-sm">Delete</button>
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
