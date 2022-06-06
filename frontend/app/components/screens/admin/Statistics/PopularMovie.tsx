import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useQuery } from 'react-query'

import SubHeading from '@/components/ui/Heading/SubHeading'
import Loader from '@/components/ui/Loader/Loader'

import { IMovie } from '@/shared/types/movie.types'

import movieService from '@/services/movie.service'

import styles from '../Admin.module.scss'

const PopularMovie: FC = () => {
	const { isLoading, data: movie } = useQuery(
		'most popular movie for admin',
		() => movieService.getMostPopularMovies(),
		{
			select: (data): IMovie => data.data[0],
		}
	)
	return (
		<div className={styles['admin__popular-movie']}>
			<SubHeading title="Популярный фильм" />
			{isLoading ? (
				<Loader className="h-48" />
			) : (
				<>
					<h3>Колличесво просмотров - {movie?.countOpened}</h3>
					<Link href={`/movie/${movie?.slug}`}>
						<a>
							<Image
								src={movie?.bigPoster + ''}
								width={285}
								height={176}
								alt={movie?.title}
								unoptimized
							/>
						</a>
					</Link>
				</>
			)}
		</div>
	)
}

export default PopularMovie
