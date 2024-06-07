import { createSlice } from '@reduxjs/toolkit'

export const reduxSlice = createSlice({
    name: 'globlestate',
    initialState: {
        TableState:false,
        clientData:{},
        TransactionType:false,
        CheckBoxFilter:'all'
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
        },
        CheckBoxFilter:(state,action)=>{
            state.CheckBoxFilter=action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {UpdateTable,ClientData,ReportState,TransactionType,CheckBoxFilter} = reduxSlice.actions
export default reduxSlice.reducer