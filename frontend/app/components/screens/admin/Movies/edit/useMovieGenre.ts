import { useQuery } from 'react-query'

import { IOption } from '@/components/ui/form-elements/Select/select.inteface'

import genreService from '@/services/genre.service'

import { errosRequest } from '@/utils/erros'

export const useMovieGenre = () => {
	const data = useQuery('list of genre', () => genreService.getGenres(), {
		select: ({ data }) =>
			data.map(
				(genre): IOption => ({
					label: genre.name,
					value: genre._id,
				})
			),
		onError: (error) => {
			errosRequest(error, 'list of genre')
		},
	})

	return data
}
