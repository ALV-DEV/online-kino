import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import userService from '@/services/user.service'

import { errosRequest } from '@/utils/erros'

import { IProfileInput } from './profile.interface'

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
	const { isLoading } = useQuery(
		'profile',
		() => userService.getProfileAuthUser(),
		{
			onSuccess: ({ data }) => {
				setValue('email', data.email)
			},
			onError: (error) => {
				errosRequest(error, 'Профиль')
			},
		}
	)

	const { mutateAsync } = useMutation(
		'update profile',
		(data: IProfileInput) => userService.updateProfile(data),
		{
			onError: (error) => {
				errosRequest(error, 'Update profile')
			},
			onSuccess: () => {
				toastr.success('Профиль', 'Обновлен')
			},
		}
	)

	const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
