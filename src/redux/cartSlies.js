import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// import user from "/userModel";



const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    detailsItems: localStorage.getItem("detailsItems")
        ? JSON.parse(localStorage.getItem("detailsItems"))
        : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        // SHOW DETAILS 
        showDetail(state, action) {
            const detail = state.detailsItems.findIndex((item) => item._id === action.payload._id);
            if (!detail) {
            } else {
                const tempProduct = { ...action.payload };
                state.detailsItems.push(tempProduct);
            }
            localStorage.setItem("detailsItems", JSON.stringify(state.detailsItems));
        },

        //SHOW ITEM REMOVE

        removeShowDetail(state, action) {
            const nextCartItems = state.detailsItems.filter(
                (detailsItems) => detailsItems._id !== action.payload._id
            );
            state.detailsItems = nextCartItems;
            localStorage.setItem("detailsItems", JSON.stringify(state.detailsItems))
        },



        // There are Some operation or action we are perform..
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.success(`Incressed ${action.payload.name} cart Quantity`);
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(` ${action.payload.name} Successfully Added`);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                (cartItem) => cartItem._id !== action.payload._id
            );
            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

        },

        decreaseCartQty(state, action) {
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem._id === action.payload._id
            )
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (cartItem) => cartItem._id !== action.payload._id
                );
                state.cartItems = nextCartItems;
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },


        getTotal(state, action) {
            let { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity
                return cartTotal;
            }, {
                total: 0,
                quantity: 0
            });
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;

        }
    }
});

export const {
    addToCart,
    removeFromCart,
    decreaseCartQty,
    getTotal,
    showDetail,
    removeShowDetail
} = cartSlice.actions;

export default cartSlice.reducer;