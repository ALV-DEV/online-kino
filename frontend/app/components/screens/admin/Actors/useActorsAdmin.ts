import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/AdminTable/adminTable.interface'

import useDebounce from '@/hooks/useDebounce'

import actorService, { getActors } from '@/services/actor.service'

import { errosRequest } from '@/utils/erros'

const useActorAdmin = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouceSearch = useDebounce(searchTerm, 500)
	const { push } = useRouter()
	const queryData = useQuery(
		['get actors for tttt admin', debouceSearch],
		() => getActors(debouceSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: `/manage/actors/edit/${actor._id}`,
						items: [actor.name, String(actor.countMovies)],
					})
				),
			onError: (error) => {
				console.log(error)

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

	const { mutateAsync: createAsync } = useMutation(
		'create actor in admin',
		() => actorService.create(),
		{
			onError: (error) => {
				errosRequest(error, 'Create actor')
			},

			onSuccess: ({ data: _id }) => {
				toastr.success('Создание', 'Актер создан')
				push(`/manage/actors/edit/${_id}`)
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

export default useActorAdmin
