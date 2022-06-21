import { FC } from 'react'

import AuthButton from './AuthButton'
import styles from './AuthPlaceholder.module.scss'

const AuthPlaceholder: FC<{ slug: string }> = ({ slug }) => {
	return (
		<div className={styles.placeholder}>
			<div className={styles.placeholder__content}>
				<div className={styles.placeholder__text}>
					Что бы начать просмотр войдите или зарегистрируйтесь
				</div>
				<AuthButton slug={slug} />
			</div>
		</div>
	)
}

export default AuthPlaceholder
