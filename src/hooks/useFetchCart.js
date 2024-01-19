import { useEffect, useContext } from 'react';
import apiService from '../utils/apiService'; // Update with the correct path
import { ShopContext } from '../context/shop-context';


const useFetchAndAddToCart = (userDetails) => {
  const { setCartItems } = useContext(ShopContext);

  useEffect(() => {
    const fetchAndAddToCart = async (userId) => {
      try {
        let cartItemsResponse = await apiService.getCart(userId);
        if (cartItemsResponse.data.length > 0) {
          setCartItems(cartItemsResponse.data);
        }

        if (cartItemsResponse.status !== 200) {
          return 'Server Error !';
        }
        // console.log("cart items response: ", cartItemsResponse);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    // Check if user is logged in
    if (userDetails && userDetails.id != null) {
      fetchAndAddToCart(userDetails.id);
    }
  }, [userDetails]); // Only re-run the effect if userDetails or setCartItems change

  // You can return any values or nothing, depending on your needs
  return null;
};

export default useFetchAndAddToCart;
