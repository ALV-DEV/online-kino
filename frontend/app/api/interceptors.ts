import axios from 'axios'
import Cookies from 'js-cookie'

import { removeTokens } from '@/services/auth/auth.helper'
import authService from '@/services/auth/auth.service'

import { APP_SERVER_URL, APP_URL } from '@/config/api.config'
import { IS_PRODUCTION } from '@/config/constants'

import { errorCath } from './api.helpers'

export const $api = axios.create({
	baseURL: IS_PRODUCTION ? APP_SERVER_URL : APP_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const instance = axios.create({
	baseURL: APP_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

instance.interceptors.request.use((config) => {
	const accessToken = Cookies.get('accessToken')

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

instance.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRaquest = error.config
		if (
			(error.response.status === 401 ||
				errorCath(error) === 'jwt expired' ||
				errorCath(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRaquest._isRetry = true
			try {
				await authService.getNewAccessToken()
				return instance.request(originalRaquest)
			} catch (error) {
				if (errorCath(error) === 'jwt expired') {
					removeTokens()
				}
			}
		}

		throw error
	}
)

export default instance
