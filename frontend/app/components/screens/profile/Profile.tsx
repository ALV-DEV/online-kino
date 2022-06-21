import { useForm } from 'react-hook-form'

import Heading from '@/components/ui/Heading/Heading'
import Loader from '@/components/ui/Loader/Loader'
import Button from '@/components/ui/form-elements/Button'

import Meta from '@/utils/meta/Meta'

import AuthField from '../Auth/AuthField'

import styles from './Profile.module.scss'
import { IProfileInput } from './profile.interface'
import { useProfile } from './useProfile'

const Profile = () => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		})

	const { isLoading, onSubmit } = useProfile(setValue)
	return (
		<Meta title="profile">
			<Heading title="Профиль" className="mb-6" />

			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<Loader count={2} />
				) : (
					<AuthField formState={formState} register={register} />
				)}

				<Button>Обновить</Button>
			</form>
		</Meta>
	)
}

export default Profile
