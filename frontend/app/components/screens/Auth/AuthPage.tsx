import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Heading from '@/components/ui/Heading/Heading'
import Button from '@/components/ui/form-elements/Button'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/meta/Meta'

import styles from './Auth.module.scss'
import AuthField from './AuthField'
import { IAuthInput } from './auth.interface'
import { useAuthRedirect } from './useAuthRedurect'

const AuthPage = () => {
	useAuthRedirect()
	const { isLoading } = useAuth()
	const [type, setType] = useState<'login' | 'register'>('login')
	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<IAuthInput>({ mode: 'onChange' })

	const { login, register } = useActions()

	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		if (type === 'login') {
			login(data)
		} else if (type === 'register') {
			register(data)
		}

		reset()
	}

	return (
		<Meta title={type === 'login' ? 'Вход' : 'Регистрация'}>
			<section className={styles.auth}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={styles.auth__form}
				>
					<Heading
						title={type === 'login' ? 'Вход' : 'Регистрация'}
						className="mb-6"
					/>
					<AuthField
						formState={formState}
						register={registerInput}
						isPasswordRequired
					/>
					<div className={styles.auth__buttons}>
						<Button
							type="submit"
							onClick={() => setType('login')}
							disabled={isLoading}
						>
							Вход
						</Button>
						<Button
							type="submit"
							onClick={() => setType('register')}
							disabled={isLoading}
						>
							Регистрация
						</Button>
					</div>
				</form>
			</section>
		</Meta>
	)
}

export default AuthPage
