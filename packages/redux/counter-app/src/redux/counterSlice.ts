import { createSlice } from "@reduxjs/toolkit"


const initiaState = {
    value : 0
}

const counterSlice = createSlice({
    name  : "counter",
    initialState : initiaState,
    reducers : {
        increment : (state) => {
            state.value++
        },
        decrement : (state) => {
            state.value--
        }
    }
})

export const selectCount = (state : any) => state.counter.value
export default counterSlice
export const { increment, decrement } = counterSlice.actions