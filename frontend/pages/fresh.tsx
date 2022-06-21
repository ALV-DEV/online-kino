import { GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/ui/CatalogMovies/Catalog'

import { IMovie } from '@/shared/types/movie.types'

import movieService from '@/services/movie.service'

const fresh: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			description="Устройте кинотеатр у себя дома! Смотрите онлайн фильмы хорошего качества в приятной домашней обстановке и в удобное для вас время. Для вас всегда доступны бесплатные фильмы без регистрации на любой вкус: сериалы, фильмы, мультфильмы и многое другое"
			title="Новые фильмы"
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await movieService.getMovies()
		return {
			props: {
				movies,
			},
			revalidate: 60,
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default fresh
