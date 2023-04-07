import {createContext, useContext, useState} from "react";
import axios from "axios";
import AuthContext from "@/context/AuthProvider";

const CartContext = createContext();

export default CartContext;

export const CartProvider = ({children}) => {
    const {authTokens} = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const getHistory = async () => {
        const response = await axios.get("http://localhost:8000/api/order/list-create-cart/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authTokens.access}`
            }
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
            return null;
        });

        return response;
    };

    const getCart = async () => {
        const response = await axios.get("http://localhost:8000/api/order/get-cart/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authTokens.access}`
            }
        }).then((response) => {
            setItems(response.data.items)
            return response.data;
        }).catch((error) => {
            console.log(error);
            return null;
        });

        return response;
    };

    const updateQuantity = async (item_id, quantity) => {
        const body = {
            "quantity": quantity
        }

        const response = await axios.put(`http://localhost:8000/api/order/update-cart/${item_id}/`, JSON.stringify(body), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authTokens.access}`
            }
        }).then((response) => {
            setItems(response.data.items)
            return response.data;
        }).catch((error) => {
            console.log(error);
            return null;
        });

        return response;
    };

    const deleteItem = async (item_id) => {
        const response = await axios.delete(`http://localhost:8000/api/order/update-cart/${item_id}/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authTokens.access}`
            }
        }).then((response) => {
            setItems(response.data.items)
            return response.data;
        }).catch((error) => {
            console.log(error);
            return null;
        });

        return response;
    };

    const addItem = async (product_id) => {
        const body = {
            "id": product_id,
        }
        const response = await axios.post(`http://localhost:8000/api/order/get-cart/`, JSON.stringify(body), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authTokens.access}`
            }
        }).then((response) => {
            setItems(response.data.items)
            return response.data;
        }).catch((error) => {
            console.log(error);
            return null;
        });

        return response;
    };

    const contextData = {
        items: items,

        getHistory: getHistory,
        getCart: getCart,
        addItem: addItem,
        updateQuantity: updateQuantity,
        deleteItem: deleteItem,
    }


    return (
        <CartContext.Provider value={contextData}>{children}</CartContext.Provider>
    );
};


