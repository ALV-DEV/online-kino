import dynamic from 'next/dynamic'
import { Controller, useForm } from 'react-hook-form'

import Heading from '@/components/ui/Heading/Heading'
import Loader from '@/components/ui/Loader/Loader'
import Button from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import UploadField from '@/components/ui/form-elements/UploadField/UploadField'

import fromStyles from '@/ui/form-elements/admin-form.module.scss'

import { IGenre, IMovie } from '@/shared/types/movie.types'

import generateSlug from '@/utils/generateSlug'
import Meta from '@/utils/meta/Meta'

import AdminNavigation from '../../admin-navigation/AdminNavigation'

import { useMovieActors } from './useMovieActors'
import { useMovieEdit } from './useMovieEdit'
import { useMovieGenre } from './useMovieGenre'

const Select = dynamic(() => import('@/ui/form-elements/Select/Select'), {
	ssr: false,
})

const TextEditor = dynamic(() => import('@/ui/form-elements/TextEditor'), {
	ssr: false,
})

const MovieEdit = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IMovie>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useMovieEdit(setValue)
	const { data: genres, isLoading: genresLoading } = useMovieGenre()
	const { data: actors, isLoading: actorsLoading } = useMovieActors()
	return (
		<Meta title="Edit Movie">
			<AdminNavigation />
			<Heading title="Редактирование фильма" />
			<form onSubmit={handleSubmit(onSubmit)} className={fromStyles.form}>
				{isLoading ? (
					<Loader count={3} />
				) : (
					<>
						<div className={fromStyles.fields}>
							<Field
								{...register('title', {
									required: 'Обязательное поле',
								})}
								placeholder="Имя"
								error={errors.title}
								style={{ width: '48%' }}
							/>
							<div style={{ width: '48%' }}>
								<SlugField
									register={register}
									error={errors.slug}
									generate={() => {
										setValue(
											'slug',
											generateSlug(getValues('title'))
										)
									}}
								/>
							</div>
							<Field
								{...register('parameters.country', {
									required: 'Обязательное поле',
								})}
								placeholder="Страны"
								error={errors.title}
								style={{ width: '31%' }}
							/>
							<Field
								{...register('parameters.duration', {
									required: 'Обязательное поле',
								})}
								placeholder="Длительность"
								error={errors.title}
								style={{ width: '31%' }}
							/>

							<Field
								{...register('parameters.year', {
									required: 'Обязательное поле',
								})}
								placeholder="Год"
								error={errors.title}
								style={{ width: '31%' }}
							/>

							<Controller
								control={control}
								name="genres"
								render={({ field, fieldState: { error } }) => (
									<Select
										field={field}
										options={genres || []}
										isLoading={genresLoading}
										isMulti
										placeholder="Жанры"
										error={error}
									/>
								)}
							/>

							<Controller
								control={control}
								name="actors"
								render={({ field, fieldState: { error } }) => (
									<Select
										field={field}
										options={actors || []}
										isLoading={actorsLoading}
										isMulti
										placeholder="Актеры"
										error={error}
									/>
								)}
							/>
							<Controller
								control={control}
								name="poster"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										placeholder="Постер"
										value={value}
										error={error}
										folder="movie-posters"
									/>
								)}
							/>

							<Controller
								control={control}
								name="bigPoster"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										placeholder="Большой постер"
										value={value}
										error={error}
										folder="movie-posters"
									/>
								)}
							/>

							<Controller
								control={control}
								name="videoUrl"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										placeholder="Видео"
										value={value}
										error={error}
										folder="movie-videos"
										isNoImage
									/>
								)}
							/>
						</div>
						<Button>Обновить</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default MovieEdit
