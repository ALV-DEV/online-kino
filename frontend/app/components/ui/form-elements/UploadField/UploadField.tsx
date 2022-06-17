import cn from 'classnames'
import Image from 'next/image'
import { CSSProperties, FC } from 'react'
import { FieldError } from 'react-hook-form'

import Loader from '../../Loader/Loader'
import styles from '../Form.module.scss'

import { useUpload } from './useUploadField'

interface IUpladFile {
	folder?: string
	value?: string
	onChange: (...event: any[]) => void
	placeholder: string
	error?: FieldError
	style?: CSSProperties
	isNoImage?: boolean
}

const UploadField: FC<IUpladFile> = ({
	onChange,
	placeholder,
	error,
	folder,
	isNoImage = false,
	style,
	value,
}) => {
	const { isLoading, uploadFile } = useUpload(onChange, folder)
	return (
		<div className={cn(styles.field, styles['upload-field'])} style={style}>
			<div className={styles['upload-flex']}>
				<label>
					<span>{placeholder}</span>
					<input type="file" onChange={uploadFile} />
					{error && (
						<div className={styles.error}>{error.message}</div>
					)}
				</label>
				{!isNoImage && (
					<div className={styles['upload-img']}>
						{isLoading ? (
							<Loader count={1} className="h-full w-full" />
						) : (
							value && (
								<Image
									alt=""
									src={value}
									layout="fill"
									unoptimized
								/>
							)
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadField
