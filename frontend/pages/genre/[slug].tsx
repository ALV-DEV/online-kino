import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/ui/CatalogMovies/Catalog'

import { IGenre, IMovie } from '@/shared/types/movie.types'

import genreService from '@/services/genre.service'
import movieService from '@/services/movie.service'

const GenrePage: NextPage<{ movies: IMovie[]; genre: IGenre }> = ({
	movies,
	genre,
}) => {
	return (
		<Catalog
			movies={movies || []}
			description={genre.description}
			title={genre.name}
		/>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: genres } = await genreService.getGenres()
		const paths = genres.map((g) => ({
			params: { slug: g.slug },
		}))
		return {
			paths,
			fallback: 'blocking',
		}
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: genre } = await genreService.getBySlug(
			String(params?.slug)
		)
		const { data: movies } = await movieService.getByGenres([genre._id])
		return {
			props: {
				movies,
				genre,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default GenrePage
