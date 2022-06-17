import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/ui/CatalogMovies/Catalog'

import { IActor, IGenre, IMovie } from '@/shared/types/movie.types'

import actorService from '@/services/actor.service'
import genreService from '@/services/genre.service'
import movieService from '@/services/movie.service'

const ActorPage: NextPage<{ movies: IMovie[]; actor: IActor }> = ({
	movies,
	actor,
}) => {
	return <Catalog movies={movies || []} title={actor.name} />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: actor } = await actorService.getActors()
		const paths = actor.map((a) => ({
			params: { slug: a.slug },
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
		const { data: actor } = await actorService.getBySlug(
			String(params?.slug)
		)
		const { data: movies } = await movieService.getByActor(actor._id)
		return {
			props: {
				movies,
				actor,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default ActorPage
