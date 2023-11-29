const API_BASE_URL = 'http://localhost:8000'; 

const apiService = {
    
    getProducts: async () => {
        try { 
            const response = await fetch(`${API_BASE_URL}/products/get_products`); 
            if (response.ok) {
                const products = await response.json(); 
                return products;
            } else {
                // Handle bad response
                alert('Error: ' + response.statusText);
                return null;
            }
        } catch (error) {
            alert('Fetch error: ' + error);
            return null;
        }
    }
};

export default apiService;

