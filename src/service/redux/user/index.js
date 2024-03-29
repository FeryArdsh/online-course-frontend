import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser(state, action) {
            state.data = action.payload;
        },
        updateInstructor(state) {
            state.data.isInstructor = true;
        },
    },
});

export const { addUser, updateInstructor } = userSlice.actions;

export default userSlice.reducer;
