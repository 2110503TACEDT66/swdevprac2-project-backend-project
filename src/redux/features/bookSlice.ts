import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type BookState = {
    bookItems: BookingItem[]
}

const initialState:BookState = {
    bookItems: []
}

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        addBooking: (state, action:PayloadAction<BookingItem>) => {
            state.bookItems = state.bookItems.filter(item => {return(item.id !== action.payload.id)})
            state.bookItems.push(action.payload)
        },
        removeBooking: (state, action:PayloadAction<string>) => {
            state.bookItems = state.bookItems.filter(item => {return(item.id !== action.payload)})
        }
    }
}) 

export const { addBooking, removeBooking } = bookSlice.actions
export default bookSlice.reducer