import { createSlice } from '@reduxjs/toolkit'

import authService from '@/services/auth/auth.service'

import { getStoreLocalStorage } from '@/utils/localstorage'

import { checkAuth, login, register } from './user.actions'
import { IInitialState } from './user.unterface'

const initialState: IInitialState = {
	isLoading: false,
	user: getStoreLocalStorage('user'),
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			authService.logout()
			state.user = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				;(state.isLoading = false), (state.user = payload.user)
			})
			.addCase(register.rejected, (state) => {
				;(state.isLoading = false), (state.user = null)
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				;(state.isLoading = false), (state.user = payload.user)
			})
			.addCase(login.rejected, (state) => {
				;(state.isLoading = false), (state.user = null)
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.user = action.payload.user
			})
	},
})

export const { reducer, actions } = userSlice
