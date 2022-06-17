import dynamic from 'next/dynamic'
import { Controller, useForm } from 'react-hook-form'

import Heading from '@/components/ui/Heading/Heading'
import Loader from '@/components/ui/Loader/Loader'
import Button from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import UploadField from '@/components/ui/form-elements/UploadField/UploadField'

import fromStyles from '@/ui/form-elements/admin-form.module.scss'

import { IActor, IGenre } from '@/shared/types/movie.types'

import generateSlug from '@/utils/generateSlug'
import Meta from '@/utils/meta/Meta'

import AdminNavigation from '../../admin-navigation/AdminNavigation'

import { useActorEdit } from './useActorEdit'

const TextEditor = dynamic(() => import('@/ui/form-elements/TextEditor'), {
	ssr: false,
})

const ActorEdit = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IActor>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useActorEdit(setValue)
	return (
		<Meta title="Edit Genre">
			<AdminNavigation />
			<Heading title="Редактирование данных актера" />
			<form onSubmit={handleSubmit(onSubmit)} className={fromStyles.form}>
				{isLoading ? (
					<Loader count={3} />
				) : (
					<>
						<div className={fromStyles.fields}>
							<Field
								{...register('name', {
									required: 'Обязательное поле',
								})}
								placeholder="Имя"
								error={errors.name}
								style={{ width: '45%' }}
							/>
							<div style={{ width: '45%' }}>
								<SlugField
									register={register}
									error={errors.slug}
									generate={() => {
										setValue(
											'slug',
											generateSlug(getValues('name'))
										)
									}}
								/>
							</div>
							<Controller
								control={control}
								name="photo"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										placeholder="Фото"
										value={value}
										error={error}
										folder="actors"
									/>
								)}
							/>
							{/* <div className="flex-1">Photo upload</div> */}
						</div>
						<Button>Обновить</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default ActorEdit
