import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/AdminTable/adminTable.interface'

import useDebounce from '@/hooks/useDebounce'

import actorService from '@/services/actor.service'

import { errosRequest } from '@/utils/erros'

const useActorAdmin = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouceSearch = useDebounce(searchTerm, 500)
	const queryData = useQuery(
		['get actors for admin', debouceSearch],
		() => actorService.getActors(debouceSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: `/manage/users/edit/${actor._id}`,
						items: [actor.name, String(actor.countMovies)],
					})
				),
			onError: (error) => {
				errosRequest(error, 'Actor list')
			},
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		'delete actor in admin',
		(id: string) => actorService.deleteActor(id),
		{
			onError: (error) => {
				errosRequest(error, 'Delete actor')
			},

			onSuccess: () => {
				toastr.success('Удаление', 'Актер удален')
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

export default useActorAdmin
