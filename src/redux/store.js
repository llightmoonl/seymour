import { configureStore } from "@reduxjs/toolkit";
import { docsReducer } from "./slices/docsSlices";
import { authReducer } from "./slices/authSlices";
import { algorithmReducer } from "./slices/algorithmsSlices";

export const store = configureStore({
    reducer: {
        docs: docsReducer,
        auth: authReducer,
        algorithm: algorithmReducer,
    },
});
