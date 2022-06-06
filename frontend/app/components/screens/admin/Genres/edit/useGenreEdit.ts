import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { IGenre } from '@/shared/types/movie.types'

import genreService from '@/services/genre.service'

import { errosRequest } from '@/utils/erros'
import { getKeys } from '@/utils/getKeys'

export const useGenreEdit = (setValue: UseFormSetValue<IGenre>) => {
	const { query, push } = useRouter()

	const genreId = String(query.id)

	const { isLoading } = useQuery(
		['genre edit', genreId],
		() => genreService.getById(genreId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError: (error) => {
				errosRequest(error, 'Edit genre')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		'update genre',
		(data: IGenre) => genreService.update(genreId, data),
		{
			onSuccess: ({ data }) => {
				toastr.success('Genre', 'Updated genre')
				push('/manage/geners')
			},
			onError: (error) => {
				errosRequest(error, 'Edit genre')
			},
		}
	)

	const onSubmit: SubmitHandler<IGenre> = async (data) => {
		await mutateAsync(data)
	}

	return {
		onSubmit,
		isLoading,
	}
}
