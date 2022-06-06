import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/AdminTable/adminTable.interface'

import useDebounce from '@/hooks/useDebounce'

import userService from '@/services/user.service'

import { formatDate } from '@/utils/date/formatDate'
import { errosRequest } from '@/utils/erros'

const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouceSearch = useDebounce(searchTerm, 500)
	const queryData = useQuery(
		['get users for admin', debouceSearch],
		() => userService.getAll(debouceSearch),
		{
			select: ({ data }) =>
				data.map(
					(user): ITableItem => ({
						_id: user._id,
						editUrl: `/manage/users/edit/${user._id}`,
						items: [user.email, formatDate(user.createdAt)],
					})
				),
			onError: (error) => {
				errosRequest(error, 'User list')
			},
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		'delete user in admin',
		(userId: string) => userService.deleteUser(userId),
		{
			onError: (error) => {
				errosRequest(error, 'Delete user')
			},

			onSuccess: () => {
				toastr.success('Удаление', 'Пользователь удален')
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

export default useUsers
