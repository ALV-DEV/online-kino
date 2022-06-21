import dynamic from 'next/dynamic'
import { FC } from 'react'

import Banner from '@/components/ui/Banner/Banner'
import Gallery from '@/components/ui/Gallery/Gallery'
import SubHeading from '@/components/ui/Heading/SubHeading'

import Meta from '@/utils/meta/Meta'

import { IMoviePage } from '../../../../pages/movie/[slug]'

import Content from './Content'
import { useCountOpened } from './useUpdateCountOpened'

const VideoPlayer = dynamic(() => import('../../ui/VideoPlayer/VideoPlayer'), {
	ssr: false,
})
const RatingMovie = dynamic(() => import('./RateMovie/RateMovie'), {
	ssr: false,
})

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	useCountOpened(movie.slug)
	return (
		<Meta title={movie.title} description={`Watch ${movie.title}`}>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>

			{/* Video */}
			<VideoPlayer slug={movie.slug} videoSrc={movie.videoUrl} />

			<div className="mt-12">
				<SubHeading title="Похожие" />
				<Gallery items={similarMovies} />
			</div>

			<RatingMovie id={movie._id} slug={movie.slug} />
		</Meta>
	)
}

export default SingleMovie
