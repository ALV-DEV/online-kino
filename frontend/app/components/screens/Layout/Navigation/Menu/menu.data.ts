import { IMenu } from './menu.interface'

export const firstMenu: IMenu = {
	title: 'Меню',
	items: [
		{
			icon: 'MdHome',
			link: '/',
			title: 'Главная',
		},
		{
			icon: 'MdExplore',
			link: '/genres',
			title: 'По жанрам',
		},
		{
			icon: 'MdRefresh',
			link: '/fresh',
			title: 'Новые фильмы',
		},
		{
			icon: 'MdLocalFireDepartment',
			link: '/trending',
			title: 'В тренде',
		},
	],
}

export const userMenu: IMenu = {
	title: 'Общие',
	items: [
		{
			icon: 'MdLogin',
			link: '/auth',
			title: 'Войти',
		},
	],
}

export const userMenuAuth: IMenu = {
	title: 'Общие',
	items: [
		{
			icon: 'MdSettings',
			link: '/profile',
			title: 'Профиль',
		},
	],
}

export const menus: IMenu[] = [firstMenu]
