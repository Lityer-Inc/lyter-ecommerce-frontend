import axios from "axios";
import Cookies from "js-cookie";
import jwt from 'jsonwebtoken';

const API_BASE_URL = 'http://localhost:8000';


const apiService = {
    
    // getProducts: async () => {
    //     try { 
    //         const response = await fetch(`${API_BASE_URL}/products/get_products`); 
    //         if (response.ok) {
    //             const products = await response.json(); 
    //             return products;
    //         } else {
    //             // Handle bad response
    //             alert('Error: ' + response.statusText);
    //             return null;
    //         }
    //     } catch (error) {
    //         alert('Fetch error: ' + error);
    //         return null;
    //     }
    // }, 
    decodeJwt: async () => {
        try {
            const token = "dfsfsdf";

            console.log('token', token);
            if (token === null) {
                return;
            }
            
            const response = await axios.get(`${API_BASE_URL}/user/jwt`, {
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            });
            console.log('decodeReponse : ', response.data);
            console.log('rseponse : ', response.status);
            if (response.status === 200) {
                return response.data;
            } else {
                alert('error : ' + response.statusText);
                return null;
            }

        } catch (err) {
            alert("error : ", response.statusText);
            return err;
        }
    }
};

export default apiService;