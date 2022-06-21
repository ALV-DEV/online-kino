import Loader from '@/components/ui/Loader/Loader'

import { useAuth } from '@/hooks/useAuth'

import styles from '../Movie.module.scss'
import MovieList from '../MovieList'

import NotAuthFavorite from './NotAuthFavorite'
import { useFavorites } from './useFavorites'

const FavoriteMovies = () => {
	const { favoriteMovies, isLoading } = useFavorites()
	const { user } = useAuth()

	if (!user) {
		return <NotAuthFavorite />
	}
	return (
		<div className="mt-11">
			{isLoading ? (
				<Loader count={3} className="h-28 mb-4" />
			) : (
				<MovieList
					movies={favoriteMovies?.slice(0, 3) || []}
					link="/favorites"
					title="Избранные"
				/>
			)}
		</div>
	)
}

export default FavoriteMovies
