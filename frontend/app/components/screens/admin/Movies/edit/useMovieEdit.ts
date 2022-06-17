import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { IGenre, IMovie } from '@/shared/types/movie.types'

import genreService from '@/services/genre.service'
import movieService from '@/services/movie.service'

import { errosRequest } from '@/utils/erros'
import { getKeys } from '@/utils/getKeys'

export const useMovieEdit = (setValue: UseFormSetValue<IMovie>) => {
	const { query, push } = useRouter()

	const id = String(query.id)

	const { isLoading } = useQuery(
		['movie edit', id],
		() => movieService.getById(id),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError: (error) => {
				errosRequest(error, 'Edit movie')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		'update movie',
		(data: IMovie) => movieService.update(id, data),
		{
			onSuccess: ({ data }) => {
				toastr.success('Movie', 'Updated Movie')
				push('/manage/movies')
			},
			onError: (error) => {
				errosRequest(error, 'Edit movie')
			},
		}
	)

	const onSubmit: SubmitHandler<IMovie> = async (data) => {
		await mutateAsync(data)
	}

	return {
		onSubmit,
		isLoading,
	}
}
