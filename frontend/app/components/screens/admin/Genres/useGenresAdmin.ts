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

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			deleteAsync,
			searchTerm,
		}),
		[queryData, searchTerm, deleteAsync]
	)
}

export default useGenresAdmin
