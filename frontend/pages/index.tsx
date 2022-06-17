import type { GetStaticProps, NextPage } from 'next'

import { IGalleryItem } from '@/components/ui/Gallery/gallery.interface'
import { ISlide } from '@/components/ui/Slider/slider.interface'

import HomePage, { IHome } from '@/screens/Home/Home'

import actorService from '@/services/actor.service'
import movieService from '@/services/movie.service'

import { getGenresList } from '@/utils/genres'

const Home: NextPage<IHome> = ({ slides, trandingActors, trandingMovies }) => {
	return (
		<HomePage
			slides={slides}
			trandingMovies={trandingMovies}
			trandingActors={trandingActors}
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await movieService.getMovies()
		const slides: ISlide[] = movies.slice(0, 3).map((movie) => ({
			_id: movie._id,
			link: `/movie/${movie.slug}`,
			bigPoster: movie.bigPoster,
			subTitle: getGenresList(movie.genres),
			title: movie.title,
		}))

		const { data: actorsData } = await actorService.getActors()

		const trandingActors: IGalleryItem[] = actorsData
			.slice(0, 7)
			.map((actor) => ({
				link: `/actors/${actor.slug}`,
				name: actor.name,
				posterPath: actor.photo,
				content: {
					title: actor.name,
					subTitle: `+${actor.countMovies} фильмов`,
				},
			}))

		const { data: moviesTrandingData } =
			await movieService.getMostPopularMovies()

		const trandingMovies: IGalleryItem[] = moviesTrandingData
			.slice(0, 7)
			.map((m) => ({
				link: `/movie/${m.slug}`,
				name: m.title,
				posterPath: m.poster,
			}))

		return {
			props: {
				slides,
				trandingMovies,
				trandingActors,
			} as IHome,
		}
	} catch (error) {
		return {
			props: {
				slides: [],
			},
		}
	}
}

export default Home
