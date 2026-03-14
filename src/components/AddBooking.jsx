import React, { useState, useEffect } from "react";
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
  const [selectedPriority, setSelectedPriority] = useState(0);
  const [availableLabs, setAvailableLabs] = useState([]);
  const [customUser, setCustomUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("rol");
    setIsAdmin(role === "Admin");
  }, []);

  const formattedDate = `${selectedDate.getFullYear()}-${
    (selectedDate.getMonth() + 1).toString().padStart(2, "0")
  }-${selectedDate.getDate().toString().padStart(2, "0")} ${selectedTime}`;

  const fetchAvailableLabs = async () => {
    try {
      const response = await BookingService.getLaboratoryByDate(formattedDate);
      setAvailableLabs(response.data || []);
    } catch (error) {
      console.error("Error al obtener laboratorios disponibles:", error);
    }
  };

  const reserveLab = async (labName) => {
    const userName = customUser.trim() !== "" ? customUser : localStorage.getItem("userName");
    const bookingDTO = {
      bookingId: null,
      labName,
      date: formattedDate,
      priority: selectedPriority,
      userName,
    };

    try {
      await BookingService.createBooking(bookingDTO);
      alert("¡Reserva creada con éxito!");
      setAvailableLabs(prevLabs => prevLabs.filter(lab => lab !== labName));
    } catch (error) {
      console.error("Error al crear la reserva:", error);
    }
  };

  return (
    <div className="centered-container">
      <div className="rounded-box">
        <h2 className="text-center">Agregar Reserva</h2>
        <div className="booking-content">

          {isAdmin && (
            <>
              <label>Ingresar nombre de usuario (opcional):</label>
              <input
                type="text"
                placeholder="Ingrese el nombre de usuario"
                value={customUser}
                onChange={(e) => setCustomUser(e.target.value)}
                className="form-control"
              />
            </>
          )}

          <label>Seleccionar Fecha:</label>
          <DatePicker selected={selectedDate} onChange={setSelectedDate} inline />
          
          <label>Seleccionar Hora:</label>
          <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
            {availableTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          
          <label>Seleccionar Prioridad:</label>
          <select value={selectedPriority} onChange={(e) => setSelectedPriority(Number(e.target.value))}>
            {[0, 1, 2, 3, 4, 5].map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
          
          <button className="btn btn-success check-availability-btn" onClick={fetchAvailableLabs}>
            Verificar Disponibilidad
          </button>
        </div>

        {availableLabs.length > 0 && (
          <div className="table-container">
            <h3>Laboratorios Disponibles</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre del Laboratorio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {availableLabs.map((lab, index) => (
                  <tr key={index}>
                    <td>{lab}</td>
                    <td>
                      <button className="btn btn-success" onClick={() => reserveLab(lab)}>Reservar</button>
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
