import { FC } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import Field from '@/components/ui/form-elements/Field'

interface IAuthField {
	register: UseFormRegister<any>
	formState: FormState<any>
	isPasswordRequired?: boolean
}

const AuthField: FC<IAuthField> = ({
	register,
	formState: { errors },
	isPasswordRequired = false,
}) => {
	return (
		<>
			<Field
				{...register('email', {
					required: 'Обязательное поле',
					pattern: {
						value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
						message: 'Введите валидный Email',
					},
				})}
				placeholder="E-mail"
				error={errors.email}
			/>

			<Field
				{...register(
					'password',
					isPasswordRequired
						? {
								required: 'Обязательное поле',
								minLength: {
									value: 6,
									message:
										'Далина пароля должна быть больше 6 символов',
								},
						  }
						: {}
				)}
				placeholder="Password"
				type={'password'}
				error={errors.password}
			/>
		</>
	)
}

export default AuthField
