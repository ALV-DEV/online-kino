import { useQuery } from 'react-query'

import { IOption } from '@/components/ui/form-elements/Select/select.inteface'

import actorService, { getActors } from '@/services/actor.service'

import { errosRequest } from '@/utils/erros'

export const useMovieActors = () => {
	const data = useQuery('list of actors', () => getActors(), {
		select: ({ data }) =>
			data.map(
				(actor): IOption => ({
					label: actor.name,
					value: actor._id,
				})
			),
		onError: (error) => {
			errosRequest(error, 'list of actors')
		},
	})

	return data
}
