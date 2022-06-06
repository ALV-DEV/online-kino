import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import MaterialIcon from '@/components/ui/MaterialIcon'

import { IMovie } from '@/shared/types/movie.types'

import styles from './Movie.module.scss'

const getMovieGenresList = (index: number, length: number, name: string) => {
	return index + 1 === length ? name : name + ', '
}

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<li className={styles.movies__item}>
			<Link href={`/movie/${movie.slug}`}>
				<a className={styles['movies__item-link']}>
					<Image
						src={movie.poster}
						alt={movie.title}
						width={65}
						height={97}
						draggable={false}
						priority
					/>
				</a>
			</Link>
			<div className={styles['movies__item-info']}>
				<h3 className={styles['movies__item-title']}>{movie.title}</h3>
				<ul className={styles['movies__item-genres']}>
					{movie.genres.map((genre, idx) => (
						<li key={genre._id}>
							<Link href={`/genre/${genre.slug}`}>
								<a>
									{getMovieGenresList(
										idx,
										movie.genres.length,
										genre.name
									)}
								</a>
							</Link>
						</li>
					))}
				</ul>
				<div className={styles['movies__item-rating']}>
					<MaterialIcon name="MdStarRate" />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			</div>
		</li>
	)
}

export default MovieItem
