import { FC } from 'react'

import MaterialIcon from '@/components/ui/MaterialIcon'

import { IMovie } from '@/shared/types/movie.types'

import ContentList from './ContentList'
import FavoritesButton from './FavoritesButton/FavoritesButton'
import styles from './SingleMovie.module.scss'

const Content: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.content}>
			<h1>{movie.title}</h1>
			<div className={styles.details}>
				<span>{movie.parameters.year} . </span>
				<span>{movie.parameters.country} . </span>
				<span>{movie.parameters.duration} мин</span>
			</div>

			<ContentList
				name="жанры"
				links={movie.genres.slice(0, 3).map((g) => ({
					_id: g._id,
					link: `/genre/${g.slug}`,
					title: g.name,
				}))}
			/>

			<ContentList
				name="актёры"
				links={movie.actors.slice(0, 3).map((a) => ({
					_id: a._id,
					link: `/actors/${a.slug}`,
					title: a.name,
				}))}
			/>

			<div className={styles.rating}>
				<MaterialIcon name="MdStarRate" />
				<span>{movie.rating.toFixed(1)}</span>
			</div>

			<FavoritesButton movieId={movie._id} />
		</div>
	)
}

export default Content
