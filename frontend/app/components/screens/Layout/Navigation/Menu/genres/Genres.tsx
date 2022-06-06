import Loader from '@/ui/Loader/Loader'

import Menu from '../Menu'

import { usePopularGenres } from './usePopularGenres'

const Genres = () => {
	const { isLoading, data } = usePopularGenres()
	return isLoading ? (
		<div className="mx-11 mb-6">
			<Loader count={5} className="h-7 mt-6" />
		</div>
	) : (
		<Menu menu={{ title: 'Популярные жанры', items: data || [] }} />
	)
}

export default Genres
