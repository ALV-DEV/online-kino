import { ChangeEvent, FC } from 'react'

import SearchField from '../SearchField/SearchField'
import Button from '../form-elements/Button'

import styles from './AdminHeader.module.scss'

interface IAdminHeader {
	onClick?: () => void
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const AdminHeader: FC<IAdminHeader> = ({
	onClick,
	searchTerm,
	handleSearch,
}) => {
	return (
		<div className={styles.header}>
			<SearchField handleSearch={handleSearch} searchTerm={searchTerm} />
			{onClick && <Button onClick={onClick}>Создать</Button>}
		</div>
	)
}

export default AdminHeader
