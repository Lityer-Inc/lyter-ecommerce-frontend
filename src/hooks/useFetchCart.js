import { useEffect, useContext } from 'react';
import apiService from '../utils/apiService'; // Update with the correct path
import { ShopContext } from '../context/shop-context';


const useFetchAndAddToCart = (userDetails) => {
  const { setCartItems } = useContext(ShopContext);

  useEffect(() => {
    const fetchAndAddToCart = async (userId) => {
      try {
        let cartItemsResponse = await apiService.getCart(userId);
        if (cartItemsResponse.length > 0) {
          console.log('cart items response: ', cartItemsResponse);
          setCartItems(cartItemsResponse);
        }
        // console.log("cart items response: ", cartItemsResponse);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    // Check if user is logged in
    if (userDetails && userDetails.id != null) {
      console.log('user details: ', userDetails);
      fetchAndAddToCart(userDetails.id);
    }
  }, [userDetails]); // Only re-run the effect if userDetails or setCartItems change

  // You can return any values or nothing, depending on your needs
  return null;
};

export default useFetchAndAddToCart;
