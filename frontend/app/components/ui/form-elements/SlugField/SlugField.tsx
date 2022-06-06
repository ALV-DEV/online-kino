import { ChangeEvent, FC } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

import Field from '../Field'

import styles from './SlugField.module.scss'

interface ISlugField {
	error?: FieldError
	register: UseFormRegister<any>
	generate: () => void
}

const SlugField: FC<ISlugField> = ({ generate, register, error }) => {
	return (
		<div className="relative">
			<Field
				{...register('slug', { required: 'Обязательное поле' })}
				placeholder="Slug"
				error={error}
			/>
			<button
				className={styles.bage}
				onClick={(e) => {
					e.preventDefault()
					generate()
				}}
			>
				Содать slug
			</button>
		</div>
	)
}

export default SlugField
