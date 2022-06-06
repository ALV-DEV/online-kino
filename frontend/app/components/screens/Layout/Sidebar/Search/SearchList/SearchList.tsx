import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { IMovie } from '@/shared/types/movie.types'

import styles from '../Serach.module.scss'

const SearchList: FC<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<div className={styles.search__list}>
			{movies.length ? (
				movies.map((movie) => (
					<Link key={movie._id} href={`/movie/${movie.slug}`}>
						<a className={styles.search__link}>
							<Image
								src={movie.poster || movie.bigPoster}
								height={50}
								width={50}
								alt={movie.title}
								objectFit="cover"
								objectPosition="top"
							/>
							<span className="text-white truncate ml-3">
								{movie.title}
							</span>
						</a>
					</Link>
				))
			) : (
				<h4 className="text-white text-center my-4">
					Ни чего не найдено
				</h4>
			)}
		</div>
	)
}

export default SearchList
