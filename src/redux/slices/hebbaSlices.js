import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLearningOver: false,
};

export const hebbaSlices = createSlice({
    name: "hebba",
    initialState,
    reducers: {
        LearningOver: (state) => {
            state.isLearningOver = true;
        },
    },
});
