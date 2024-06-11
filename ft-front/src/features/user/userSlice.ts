import { createSlice} from '@reduxjs/toolkit';
import { User } from '../../types/userTypes';
import { fetchUserProfile, updatePassword, deleteUser } from './userThunks';

interface UserState {
    userInfo: User | null;
    loading: boolean;
    error: string | null;
    updatePasswordSuccess: boolean;
    deleteUserSuccess: boolean;
}

const initialState: UserState = {
    userInfo: null,
    loading: false,
    error: null,
    updatePasswordSuccess: false,
    deleteUserSuccess: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.updatePasswordSuccess = false;
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.loading = false;
                state.updatePasswordSuccess = true;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
                state.updatePasswordSuccess = false;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.deleteUserSuccess = false;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false;
                state.userInfo = null;
                state.deleteUserSuccess = true;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
                state.deleteUserSuccess = false;
            });
    },
});

export default userSlice.reducer;
