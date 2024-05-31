import { createSlice } from '@reduxjs/toolkit'

export const reduxSlice = createSlice({
    name: 'globlestate',
    initialState: {
        TableState:false,
        clientData:{},
        TransactionType:false
    },
    reducers: {
        UpdateTable: (state,action) => {
            state.TableState = action.payload
        },
        ClientData:(state,action)=>{
            state.clientData=action.payload
        },
        TransactionType:(state,action)=>{
            state.TransactionType=action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {UpdateTable,ClientData,ReportState,TransactionType} = reduxSlice.actions
export default reduxSlice.reducer