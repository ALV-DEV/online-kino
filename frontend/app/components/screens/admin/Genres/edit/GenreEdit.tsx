import { useForm } from 'react-hook-form'

import Heading from '@/components/ui/Heading/Heading'
import Loader from '@/components/ui/Loader/Loader'
import Button from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'

import fromStyles from '@/ui/form-elements/admin-form.module.scss'

import { IGenre } from '@/shared/types/movie.types'

import generateSlug from '@/utils/generateSlug'
import Meta from '@/utils/meta/Meta'

import AdminNavigation from '../../admin-navigation/AdminNavigation'

import { useGenreEdit } from './useGenreEdit'

const GenreEdit = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<IGenre>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useGenreEdit(setValue)
	return (
		<Meta title="Edit Genre">
			<AdminNavigation />
			<Heading title="Редактирование жанра" />
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
								style={{ width: '31%' }}
							/>
							<div style={{ width: '31%' }}>
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
							<Field
								{...register('icon', {
									required: 'Обязательное поле',
								})}
								placeholder="Иконка"
								error={errors.icon}
								style={{ width: '31%' }}
							/>
							<div>{/* Text Editor  */}</div>
							<Button>Обновить</Button>
						</div>
					</>
				)}
			</form>
		</Meta>
	)
}

export default GenreEdit
