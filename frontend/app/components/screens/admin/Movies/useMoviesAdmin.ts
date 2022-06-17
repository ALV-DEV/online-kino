import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/AdminTable/adminTable.interface'

import useDebounce from '@/hooks/useDebounce'

import movieService from '@/services/movie.service'

import { errosRequest } from '@/utils/erros'
import { getGenresList } from '@/utils/genres'

const useMoviesAdmin = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouceSearch = useDebounce(searchTerm, 500)
	const { push } = useRouter()
	const queryData = useQuery(
		['get movies for admin', debouceSearch],
		() => movieService.getMovies(debouceSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: `/manage/movies/edit/${movie._id}`,
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating),
						],
					})
				),
			onError: (error) => {
				errosRequest(error, 'User list')
			},
		}
	)

	const { mutateAsync: createAsync } = useMutation(
		'create actor in admin',
		() => movieService.create(),
		{
			onError: (error) => {
				errosRequest(error, 'Create movie')
			},

			onSuccess: ({ data: _id }) => {
				toastr.success('Создание', 'Фильм добавлен')
				push(`/manage/movies/edit/${_id}`)
			},
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		'delete movie in admin',
		(id: string) => movieService.deleteMovie(id),
		{
			onError: (error) => {
				errosRequest(error, 'Delete movie')
			},

			onSuccess: () => {
				toastr.success('Удаление', 'Фильм удален')
				queryData.refetch()
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			deleteAsync,
			searchTerm,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}

export default useMoviesAdmin
