import { configureStore } from "@reduxjs/toolkit";
import cartReduser from "./cartSlies";


const store = configureStore({
    reducer: {
        cart: cartReduser
    }
})
export default store;