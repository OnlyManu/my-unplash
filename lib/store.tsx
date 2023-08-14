import { IPicture } from "./types";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const picturesSlice = createSlice({
    name: "unplash",
    initialState: {
        pictures: [] as Array<IPicture>,
        arePicturesLoading: true,
    },
    reducers: {
        addPictureAction(state, action) {
            state.pictures = [...state.pictures, action.payload]
        },
        deletePictureAction(state, action) {
            state.pictures = state.pictures.filter((picture) => picture.id !== action.payload)
        },
        initialisePicturesListAction(state, action) {
            state.pictures = [...action.payload]
        },
        picturesLoadingAction(state, action) {
            state.arePicturesLoading = action.payload
        },
    }
})

export const { addPictureAction, deletePictureAction, initialisePicturesListAction, picturesLoadingAction } = picturesSlice.actions

export const picturesStore = configureStore({
    reducer: picturesSlice.reducer
})