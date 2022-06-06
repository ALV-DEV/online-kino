import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorCath } from 'api/api.helpers'
import { toastr } from 'react-redux-toastr'

import authService from '@/services/auth/auth.service'

import { errosRequest } from '@/utils/erros'

import { IAuthResponce, IEmailPassword } from './user.unterface'

// register

export const register = createAsyncThunk<IAuthResponce, IEmailPassword>(
	'auth/register',
	async ({ email, password }, thunkApi) => {
		try {
			const data = await authService.register(email, password)
			toastr.success('Регистрация', 'Вы зарегистрированы !')
			return data
		} catch (error) {
			errosRequest(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

// login

export const login = createAsyncThunk<IAuthResponce, IEmailPassword>(
	'auth/login',
	async ({ email, password }, thunkApi) => {
		try {
			const data = await authService.login(email, password)
			toastr.success('Авторизация', 'Приятного просмотра !')
			return data
		} catch (error) {
			errosRequest(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

// logout

const logout = (): any => {
	authService.logout()
}

// checkAuth

export const checkAuth = createAsyncThunk<IAuthResponce>(
	'auth/check-auth',
	async (_, thunkApi) => {
		try {
			const data = await authService.getNewAccessToken()
			return data
		} catch (error) {
			if (errorCath(error) === 'jwt expired') {
				toastr.error('Авторизация', 'Пожалуйста войдите снова !')
				thunkApi.dispatch(logout())
			}
			return thunkApi.rejectWithValue(error)
		}
	}
)
