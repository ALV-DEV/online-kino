import Heading from '@/components/ui/Heading/Heading'
import Loader from '@/components/ui/Loader/Loader'

import Meta from '@/utils/meta/Meta'

import { useFavorites } from '../Layout/Sidebar/Movies/FavoriteMovies/useFavorites'

import FavoriteItem from './FavoriteItem'
import styles from './Favorites.module.scss'

const Favorites = () => {
	const { favoriteMovies, isLoading } = useFavorites()
	return (
		<Meta title="Favorites">
			<Heading title="Избранные" />
			<section className={styles.favorites}>
				{isLoading ? (
					<Loader
						count={3}
						className={styles.favorites__loader}
						containerClassName={
							styles['favorites__loader-container']
						}
					/>
				) : (
					favoriteMovies?.map((movie) => (
						<FavoriteItem key={movie._id} movie={movie} />
					))
				)}
			</section>
		</Meta>
	)
}

export default Favorites
