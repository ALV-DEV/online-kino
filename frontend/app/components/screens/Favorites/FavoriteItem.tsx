import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { IMovie } from '@/shared/types/movie.types'

import FavoritesButton from '../SingleMovie/FavoritesButton/FavoritesButton'

import styles from './Favorites.module.scss'

const FavoriteItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles['item-wrapper']}>
			<FavoritesButton movieId={movie._id} />

			<Link href={`/movie/${movie.slug}`}>
				<a className={styles.item}>
					<Image
						alt={movie.title}
						src={movie.bigPoster}
						layout="fill"
						draggable={false}
						priority
					/>

					<h3 className={styles.item__title}>{movie.title}</h3>
				</a>
			</Link>
		</div>
	)
}

export default FavoriteItem
