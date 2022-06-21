import dynamic from 'next/dynamic'

import styles from './Movie.module.scss'
import PopularMovies from './PopularMovies'

const FavoriteMovies = dynamic(
	() => import('./FavoriteMovies/FavoriteMovies'),
	{ ssr: false }
)

const MovieContainer = () => {
	return (
		<div>
			<PopularMovies />
			<FavoriteMovies />
		</div>
	)
}

export default MovieContainer
