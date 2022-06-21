import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import SingleMovie from '@/components/screens/SingleMovie/SingleMovie'
import Catalog from '@/components/ui/CatalogMovies/Catalog'
import { IGalleryItem } from '@/components/ui/Gallery/gallery.interface'

import { IActor, IGenre, IMovie } from '@/shared/types/movie.types'

import actorService from '@/services/actor.service'
import genreService from '@/services/genre.service'
import movieService from '@/services/movie.service'

export interface IMoviePage {
	movie: IMovie
	similarMovies: IGalleryItem[]
}

const MoviePage: NextPage<IMoviePage> = ({ movie, similarMovies }) => {
	return <SingleMovie movie={movie} similarMovies={similarMovies} />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movie } = await movieService.getMovies()
		const paths = movie.map((m) => ({
			params: { slug: m.slug },
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
		const { data: movie } = await movieService.getBySlug(
			String(params?.slug)
		)
		const { data: dataSimilarMovies } = await movieService.getByGenres(
			movie.genres.map((g) => g._id)
		)
		const similarMovies: IGalleryItem[] = dataSimilarMovies
			.filter((m) => m._id !== movie._id)
			.map((m) => ({
				link: `/movie/${m.slug}`,
				name: movie.title,
				posterPath: m.poster,
			}))
		return {
			props: {
				similarMovies,
				movie,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default MoviePage
