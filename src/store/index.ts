// import { configureStore } from '@reduxjs/toolkit';

import { configureStore } from "@reduxjs/toolkit";

import users from "./slices/users.slice";

// const store = configureStore()

const store = configureStore({
    reducer: { users }
});

export default store;