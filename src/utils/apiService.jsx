import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";

const API_BASE_URL = "http://localhost:8000";

const apiService = {
  getStores: async () => {
    try {
      const token = Cookies.get("token")
        ? JSON.parse(Cookies.get("token"))
        : null;

      const response = await axios.get(`${API_BASE_URL}/stores/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const stores = await response.data;
        return stores;
      } else {
        // Handle bad response
        alert("Error: " + response.statusText);
        return null;
      }
    } catch (error) {
      alert("please login to access the application");
      return null;
    }
  },
  decodeJwt: async () => {
    try {
      const token = Cookies.get("token")
        ? JSON.parse(Cookies.get("token"))
        : null;

      if (token == null) {
        // alert("token is null");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/user/decodeJwt`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        return { status: 200, data: response.data };
      } else {
        alert("error : " + response.statusText);
        return { status: 404, data: response.statusText };
      }
    } catch (err) {
      // alert("error : ", response.statusText);
      return { status: 500, data: "Server Error" };
    }
  },
  getCart: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${userId}/cart`);
      return response;
    } catch (e) {
      console.log("server error !");
    }
  },
  deleteCart: async (userId, productId) => {
    console.log("rpdocut id : ", productId);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/user/${userId}/cart`,
        {
          data: {
            productId: productId
          }
        }
      );
      return response;
    } catch (e) {
      throw Error("server error !");
    }
  }
};

export default apiService;
