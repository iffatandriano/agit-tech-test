import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, getUsersById } from "../../services";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (params: any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await getUsers(params);
            const data = response.data;
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchUsersById = createAsyncThunk(
    'users/fetchUsers',
    async (id: string, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await getUsersById(id);
            
            const data = response.data;
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)