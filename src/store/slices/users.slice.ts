// import { createSlice } from "@reduxjs/toolkit";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { slicesTypes } from "../slicesTypes";
import { fetchUsers } from "../states/users.state";

export interface initialStateProps {
    records: any;
    loading: boolean;
    error: any;
    record: any;
    params: any
}

const initialState: initialStateProps = {
    records: [],
    loading: false,
    error: '',
    record: null,
    params: {
        page: 1,
        limit: 10,
        search: null,
        sortBy: null,
        order: 'desc',
    }
}

export const usersSlice = createSlice({
    name: slicesTypes.USER,
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.record = null
        },
        setRecord: (state, value) => {
            state.records = value
        },
        setParams: (state, value) => {
            state.records = value
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchUsers.fulfilled, (state, action: PayloadAction) => {
            state.loading = false;
            state.records = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const { setRecord, setParams } = usersSlice.actions;

export default usersSlice.reducer;