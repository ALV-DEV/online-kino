import { FC } from 'react'
import { useQuery } from 'react-query'

import Loader from '@/components/ui/Loader/Loader'

import adminService from '@/services/admin.service'

import styles from '../Admin.module.scss'

const CountUser: FC = () => {
	const { isLoading, data: response } = useQuery('Count user', () =>
		adminService.getCountUser()
	)
	return (
		<div className={styles.admin__users}>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles['admin__users-number']}>
					{response?.data}
				</div>
			)}
			<div className={styles['admin__users-text']}>Пользователей</div>
		</div>
	)
}

export default CountUser
