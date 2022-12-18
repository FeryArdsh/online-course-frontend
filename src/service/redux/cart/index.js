import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart(state, action) {
            const findId = state.cart.find(
                (item) => item._id === action.payload._id
            );
            if (findId) {
                return isRejectedWithValue("Kursus sudah ada di keranjang");
            }
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
