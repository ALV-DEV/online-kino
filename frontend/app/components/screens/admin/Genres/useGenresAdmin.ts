import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/AdminTable/adminTable.interface'

import useDebounce from '@/hooks/useDebounce'

import genreService from '@/services/genre.service'

import { errosRequest } from '@/utils/erros'

const useGenresAdmin = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouceSearch = useDebounce(searchTerm, 500)
	const { push } = useRouter()
	const queryData = useQuery(
		['get genres for admin', debouceSearch],
		() => genreService.getGenres(debouceSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: `/manage/genres/edit/${genre._id}`,
						items: [genre.name, genre.slug],
					})
				),
			onError: (error) => {
				errosRequest(error, 'Genre list')
			},
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		'delete genre in admin',
		(id: string) => genreService.deleteGenre(id),
		{
			onError: (error) => {
				errosRequest(error, 'Delete genre')
			},

			onSuccess: () => {
				toastr.success('Удаление', 'Жанр удален')
				queryData.refetch()
			},
		}
	)

	const { mutateAsync: createAsync } = useMutation(
		'create genre in admin',
		() => genreService.create(),
		{
			onError: (error) => {
				errosRequest(error, 'Create genre')
			},

			onSuccess: ({ data: _id }) => {
				toastr.success('Создание', 'Жанр создан')
				push(`/manage/genres/edit/${_id}`)
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

export default useGenresAdmin
