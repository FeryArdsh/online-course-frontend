import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart(state, action) {
            state.cart.push(action.payload);
        },
        deleteCart(state, action) {
            const itemId = action.payload;
            state.cart = state.cart.filter((item) => item._id !== itemId);
        },
    },
});

export const { addCart, deleteCart } = cartSlice.actions;

export default cartSlice.reducer;
