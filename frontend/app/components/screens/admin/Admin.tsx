import { FC } from 'react'

import Heading from '@/components/ui/Heading/Heading'

import Meta from '@/utils/meta/Meta'

import styles from './Admin.module.scss'
import Statistics from './Statistics/Statistics'
import AdminNavigation from './admin-navigation/AdminNavigation'

const Admin: FC = () => {
	return (
		<Meta title="Панель администратора">
			<AdminNavigation />
			<div className={styles.admin}>
				<Heading title="Панель администратора" />
				<Statistics />
			</div>
		</Meta>
	)
}

export default Admin
