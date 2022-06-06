import Link from 'next/link'
import { FC } from 'react'

import styles from './Movie.module.scss'
import MovieItem from './MovieItem'
import { IMovieList } from './movie.interface'

const MovieList: FC<IMovieList> = ({ link, movies, title }) => {
	return (
		<div className={styles.movies}>
			<h2 className={styles.movies__title}>{title}</h2>
			<ul className={styles.movies__list}>
				{movies.map((movie) => (
					<MovieItem key={movie._id} movie={movie} />
				))}
			</ul>
			<Link href={link}>
				<a className={styles.movies__btn}>Больше фильмов</a>
			</Link>
		</div>
	)
}

export default MovieList
