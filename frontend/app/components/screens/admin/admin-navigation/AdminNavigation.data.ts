import { INavItem } from './AdminNavigation.inteface'

export const navItems: INavItem[] = [
	{
		title: 'Статистика',
		link: '/manage',
	},

	{
		title: 'Пользователи',
		link: '/manage/users',
	},
	{
		title: 'Фильмы',
		link: '/manage/movies',
	},
	{
		title: 'Актёры',
		link: '/manage/actors',
	},
	{
		title: 'Жанры',
		link: '/manage/genres',
	},
]
