import Cookies from 'js-cookie'

import { IAuthResponce, ITokens } from '@/store/user/user.unterface'

export const saveToCookies = (data: ITokens) => {
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
}

export const saveToStorage = (data: IAuthResponce) => {
	saveToCookies(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}

export const removeTokens = () => {
	console.log('afaf')

	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}
