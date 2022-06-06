import FavoriteMovies from './FavoriteMovies/FavoriteMovies'
import styles from './Movie.module.scss'
import PopularMovies from './PopularMovies'

const MovieContainer = () => {
	return (
		<div>
			<PopularMovies />
			<FavoriteMovies />
		</div>
	)
}

export default MovieContainer
