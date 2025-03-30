import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/";

class BookingService {

    getBookingByUser() {
        return axios.get(USER_API_BASE_URL + 'query?userName=John Doe')
            .then(res => {return res.data || []; })
            
    }
    
    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }

    createBooking(createBookingDTO) {
        return axios.post(USER_API_BASE_URL + 'booking', createBookingDTO);
    }
    

    getLaboratoryByDate(date){
        return axios.get(USER_API_BASE_URL + 'query/lab?date=' + date);
    }

    updateUser(user, userId){
        return axios.put(USER_API_BASE_URL + '/' + userId, user);
    }

    deleteBooking(deleteDTO) {
        console.log("Enviando DELETE con payload:", deleteDTO);
        return axios.delete(USER_API_BASE_URL + 'booking', { 
            headers: { "Content-Type": "application/json" },
            data: deleteDTO 
        });
    }

}

export default new BookingService()