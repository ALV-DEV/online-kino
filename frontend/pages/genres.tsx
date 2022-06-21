import { GetStaticProps, NextPage } from 'next'

import Collections from '@/components/screens/Collections/Collections'
import { ICollection } from '@/components/screens/Collections/collections.interface'
import Catalog from '@/components/ui/CatalogMovies/Catalog'

import { IMovie } from '@/shared/types/movie.types'

import genreService from '@/services/genre.service'
import movieService from '@/services/movie.service'

const GenresPage: NextPage<{ collections: ICollection[] }> = ({
	collections,
}) => {
	return <Collections collections={collections} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: collections } = await genreService.getCollections()
		return {
			props: {
				collections,
			},
			revalidate: 60,
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default GenresPage
