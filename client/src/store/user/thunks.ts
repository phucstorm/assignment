import { createAsyncThunk } from "@reduxjs/toolkit";
import * as constants from './constants'
import type { User } from "@acme/shared-models";

export const fetchUsers = createAsyncThunk(constants.GET_LIST, async (): Promise<User[]> => {
    const response = await fetch('/api/users')
    return response.json()
})