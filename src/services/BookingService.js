import axios from 'axios';


const USER_API_BASE_URL = "https://skynet-bqhme5gheecnexcj.eastus-01.azurewebsites.net/";
//const USER_API_BASE_URL = "http://localhost:8443"


class BookingService {
    constructor() {
        this.api = axios.create({ baseURL: USER_API_BASE_URL });

        // Interceptor para incluir el token en cada solicitud
        this.api.interceptors.request.use(config => {
            const token = localStorage.getItem('token');
            
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                config.headers['Content-Type'] = 'application/json';
                console.log(token);
            }
            

            
        

            return config;
        }, error => {
            console.error("❌ Error en el interceptor:", error);
            return Promise.reject(error);
        });
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    login(credentials) {
        return this.api.post('login', credentials, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.data);
    }

    getBookingByUser() {
        return this.api.get('query?userName='+localStorage.getItem("userName")).then(res => res.data || []);
    }

    getBookingByAdmin(user) {
        return this.api.get('query?userName='+user).then(res => res.data || []);
    }

    createBooking(createBookingDTO) {
        return this.api.post('booking', createBookingDTO);
    }

    getLaboratoryByDate(date) {
        return this.api.get('query/lab?date='+date);
    }

    deleteBooking(deleteDTO) {
        return this.api.delete('booking', {
            headers: { "Content-Type": "application/json" },
            data: deleteDTO
        });
    }

    createUser(createUserDTO){
        return this.api.post('admin/user', createUserDTO);
    }

    deleteUser(user){
        return this.api.delete('admin/user?userName='+user);
    }

    createLaboratory(laboratory){
        return this.api.post('admin/lab?labName='+ laboratory);
    }

    deleteLaboratory(laboratory){
        return this.api.delete('admin/lab?labName='+ laboratory);
    }

}

export default new BookingService();
