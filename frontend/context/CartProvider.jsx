import {createContext, useState} from "react";

import useAxios from "@/utils/useAxios";

const CartContext = createContext();
export default CartContext;

export const CartProvider = ({children}) => {
    const api = useAxios();
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const getHistory = async () => {
        return await api
            .get("order/list-create-cart/")
            .then((response) => {
                return response.data;
            });
    };

    const getCart = async () => {
        return await api
            .get("order/get-cart/")
            .then((response) => {
                setItems(response.data.items)
                return response.data;
            });
    };

    const updateQuantity = async (item_id, quantity) => {
        const body = {
            "quantity": quantity
        }

        return await api
            .put(`order/update-cart/${item_id}/`, JSON.stringify(body))
            .then((response) => {
                setItems(response.data.items)
                return response.data;
            });
    };

    const deleteItem = async (item_id) => {
        return await api
            .delete(`order/update-cart/${item_id}/`)
            .then((response) => {
                setItems(response.data.items)
                return response.data;
            });
    };

    const addItem = async (product_id) => {
        const body = {
            "id": product_id,
        }
        return await api
            .post(`order/get-cart/`, JSON.stringify(body))
            .then((response) => {
                setItems(response.data.items)
                return response.data;
            });
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
        <CartContext.Provider value={contextData}>
            {loading ? null : children}
        </CartContext.Provider>
    );
};
