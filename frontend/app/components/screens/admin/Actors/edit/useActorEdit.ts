import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { IActor, IGenre } from '@/shared/types/movie.types'

import actorService from '@/services/actor.service'
import genreService from '@/services/genre.service'

import { errosRequest } from '@/utils/erros'
import { getKeys } from '@/utils/getKeys'

export const useActorEdit = (setValue: UseFormSetValue<IActor>) => {
	const { query, push } = useRouter()

	const actorId = String(query.id)

	const { isLoading } = useQuery(
		['actor edit', actorId],
		() => actorService.getById(actorId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError: (error) => {
				errosRequest(error, 'Edit Actor')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		'update actor',
		(data: IActor) => actorService.update(actorId, data),
		{
			onSuccess: ({ data }) => {
				toastr.success('Actor', 'Updated actor')
				push('/manage/actors')
			},
			onError: (error) => {
				errosRequest(error, 'Edit actor')
			},
		}
	)

	const onSubmit: SubmitHandler<IActor> = async (data) => {
		await mutateAsync(data)
	}

	return {
		onSubmit,
		isLoading,
	}
}
