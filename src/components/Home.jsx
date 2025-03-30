import React, { Component } from 'react';
import '../styles/Home.css';
import calendarIcon from '../images/calendar-icon.jpg';
import bookingIcon from '../images/booking-icon.jpg';

class Home extends Component {
    logout = () => {
        this.props.history.push('/');
    };

    render() {
        return (
            <div className="dashboard-container">
                <header className="text-center">
                    <h1>Home</h1>
                </header>

                <div className="menu">
                    <a href="/booking" className="menu-item">
                        <img src={calendarIcon} alt="Booking Manage" />
                        <p>Booking Manage</p>
                    </a>

                    <a href="/mybookings" className="menu-item">
                        <img src={bookingIcon} alt="My Bookings" />
                        <p>My Bookings</p>
                    </a>
                </div>

                <footer>
                    <button onClick={this.logout}>LOG OUT</button>
                </footer>
            </div>
        );
    }
}

export default Home;
