import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItem, setCartItem] = useState({});
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("")

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Please select a size');
            return;
        }

        let cartData = structuredClone(cartItem);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }

        setCartItem(cartData);

        if (token) {
            try {

                await axios.post(backendUrl + "/api/cart/add", { itemId, size }, { headers: { token } })
                toast.success("Added to cart")

            } catch (error) {
                console.log(error)
                toast.error("Error adding to cart")
            }
        }

    }


    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item];
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
        return totalCount;
    }


    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + "/api/cart/update", { itemId, size, quantity }, { headers: { token } })
                toast.success("Cart updated")
            } catch (error) {
                console.log(error)
                toast.error("Error updating cart")
            }
        }
    }

    const getTotalCartAmount = () => {

        let totalAmount = 0;

        for (const items in cartItem) {

            let itemInfo = products.find(
                (product) => product._id.toString() === items.toString()
            );

            if (itemInfo) {
                for (const item in cartItem[items]) {

                    try {

                        if (cartItem[items][item] > 0) {

                            totalAmount +=
                                itemInfo.price * cartItem[items][item];

                        }

                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }

        return totalAmount;
    }

    const getProductData = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.data);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { token } });
            if (response.data.success) {
                setCartItem(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        getProductData();
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            getUserCart(localStorage.getItem("token"));
        }
    }, [token])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItem, setCartItem, addToCart, getCartCount, updateQuantity, getTotalCartAmount,
        navigate, backendUrl, setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;