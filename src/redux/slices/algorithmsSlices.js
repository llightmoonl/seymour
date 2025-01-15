import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLearningOver: false,
};

export const algorithmsSlices = createSlice({
    name: "algorithms",
    initialState,
    reducers: {
        LearningOver: (state) => {
            state.isLearningOver = true;
        },
    },
});

export const algorithmReducer = algorithmsSlices.reducer;
export const { LearningOver } = algorithmsSlices.actions;
