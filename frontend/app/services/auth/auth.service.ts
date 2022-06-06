import { $api } from 'api/interceptors'
import Cookies from 'js-cookie'

import { getAuthUrl } from '@/config/api.config'

import { IAuthResponce } from '@/store/user/user.unterface'

import { removeTokens, saveToStorage } from './auth.helper'

class AuthService {
	async register(email: string, password: string) {
		const response = await $api.post<IAuthResponce>(
			getAuthUrl('/register'),
			{ email, password }
		)
		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response.data
	}

	async login(email: string, password: string) {
		const response = await $api.post<IAuthResponce>(getAuthUrl('/login'), {
			email,
			password,
		})
		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response.data
	}

	logout() {
		removeTokens()
		localStorage.removeItem('user')
	}

	async getNewAccessToken() {
		const refreshToken = Cookies.get('refreshToken')
		const res = await $api.post<IAuthResponce>(
			getAuthUrl('/login/access-token'),
			{ refreshToken }
		)
		if (res.data.accessToken) {
			saveToStorage(res.data)
		}

		return res.data
	}
}

export default new AuthService()
