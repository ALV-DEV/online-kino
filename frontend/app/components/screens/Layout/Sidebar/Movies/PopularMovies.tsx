import { useQuery } from 'react-query'

import Loader from '@/components/ui/Loader/Loader'

import movieService from '@/services/movie.service'

import styles from './Movie.module.scss'
import MovieList from './MovieList'

const PopularMovies = () => {
	const { isLoading, data: popularMovies } = useQuery(
		'Get popular movies in sidebar',
		() => movieService.getMostPopularMovies(),
		{ select: ({ data }) => data }
	)
	return isLoading ? (
		<div className="mt-11">
			<Loader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MovieList
			link="/trending"
			movies={popularMovies?.slice(0, 3) || []}
			title="Популярные фильмы"
		/>
	)
}

export default PopularMovies
