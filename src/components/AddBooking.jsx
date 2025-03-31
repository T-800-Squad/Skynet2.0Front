import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/AddBooking.css";
import BookingService from "../services/BookingService";

const availableTimes = [
  "07:00:00", "08:30:00", "10:00:00", "11:30:00", 
  "13:00:00", "14:30:00", "16:00:00", "17:30:00"
];

const AddBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(availableTimes[0]);
  const [availableLabs, setAvailableLabs] = useState([]);

  const formattedDate = `${selectedDate.getFullYear()}-${
    (selectedDate.getMonth() + 1).toString().padStart(2, "0")
  }-${selectedDate.getDate().toString().padStart(2, "0")} ${selectedTime}`;

  const fetchAvailableLabs = async () => {
    try {
      const response = await BookingService.getLaboratoryByDate(formattedDate);
      setAvailableLabs(response.data || []);
    } catch (error) {
      console.error("Error fetching available labs:", error);
    }
  };

  const reserveLab = async (labName) => {
    const bookingDTO = {
      userName: "John Doe",
      labName,
      date: formattedDate,
    };

    try {
      await BookingService.createBooking(bookingDTO);
      alert("Booking created successfully!");
      setAvailableLabs(prevLabs => prevLabs.filter(lab => lab !== labName));
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="centered-container">
      <div className="rounded-box">
        <h2 className="text-center">Add Booking</h2>
        <div className="booking-content">
          <label>Select Date:</label>
          <DatePicker selected={selectedDate} onChange={setSelectedDate} inline />
          
          <label>Choose Time:</label>
          <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
            {availableTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          
          <button className="btn btn-success check-availability-btn" onClick={fetchAvailableLabs}>Check Availability</button>
        </div>

        {availableLabs.length > 0 && (
          <div className="table-container">
            <h3>Available Labs</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Lab Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {availableLabs.map((lab, index) => (
                  <tr key={index}>
                    <td>{lab}</td>
                    <td>
                      <button className="btn btn-success" onClick={() => reserveLab(lab)}>Reserve</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBooking;