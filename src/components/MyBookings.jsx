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
            console.error("Error fetching bookings:", error);
        }
    };

    deleteBooking = async (id) => {
        let deleteDTO = { userName: localStorage.getItem("userName"), bookingId: id };
        try {
            await BookingService.deleteBooking(deleteDTO);
            this.setState((prevState) => ({ bookings: prevState.bookings.filter(booking => booking.bookingId !== id) }));
        } catch (error) {
            console.error("Error eliminando booking:", error);
        }
    };

    handleUserChange = (e) => {
        this.setState({ customUser: e.target.value });
    };

    render() {
        return (
            <div className="my-bookings-container">
                <h2 className="text-center">My Bookings</h2>
                {this.state.isAdmin && (
                    <div>
                        <label>Enter Username (optional):</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={this.state.customUser}
                            onChange={this.handleUserChange}
                            className="form-control"
                        />
                        <button className="btn btn-success mt-2" onClick={this.fetchBookings}>Fetch Bookings</button>
                    </div>
                )}
                {this.state.bookings.length === 0 ? (
                    <p>No bookings available.</p>
                ) : (
                    <div className="row">
                        <table className="table table-striped table-bordered mt-4">
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
