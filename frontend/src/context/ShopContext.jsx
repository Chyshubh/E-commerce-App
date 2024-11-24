import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "$"
    const delivery_fee = 10;
    const backendUrl = "http://localhost:8000";
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [kartItems, setKartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate([]);

    const addToKart = async (itemId, size) => {

        if (!size) {
            toast.error("Please Select Product Size");
            return;

        }

        let cartData = structuredClone(kartItems);


        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;

        }
        setKartItems(cartData);

        if (token) {
            try {

                await axios.post('http://localhost:8000/api/kart/add', { itemId, size }, { headers: { token } })

            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }

    }

    const getKartCount = () => {
        let totalCount = 0;
        for (const items in kartItems) {
            for (const item in kartItems[items]) {
                try {
                    if (kartItems[items][item] > 0) {
                        totalCount += kartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }


    const updateQuantity = async (itemId, size, quantity) => {
        
        let kartData = structuredClone(kartItems);

        kartData[itemId][size] = quantity;

        setKartItems(kartData);

        if (token) {
            try {
                await axios.post('http://localhost:8000/api/kart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }

        }
    }

    const getKartAmount = () => {
        let totalAmount = 0;

        for (const items in kartItems) {
            let itemInfo = products.find((product) => product._id === items);

            if (!itemInfo) {
                console.warn(`Product with _id ${items} not found in products array.`);
                continue; // Skip this item if no matching product is found
            }

            for (const item in kartItems[items]) {
                try {
                    if (kartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * kartItems[items][item];
                    }
                } catch (error) {
                    console.error("Error calculating total:", error);
                }
            }
        }
        return totalAmount;
    }

    const getProductData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`)
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getUserKart = async (token) => {
        try {

            const response = await axios.post('http://localhost:8000/api/kart/get', {}, { headers: { token } })
            if (response.data.success) {
                setKartItems(response.data.KartData)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductData();
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserKart(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        setKartItems,
        kartItems,
        addToKart,
        getKartCount,
        updateQuantity,
        getKartAmount, navigate,
        backendUrl, token, setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider