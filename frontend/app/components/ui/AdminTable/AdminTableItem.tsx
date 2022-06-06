import { FC } from 'react'

import styles from './AdminTable.module.scss'
import AdminTableActions from './AdminTableActions/AdminTableActions'
import { IAdminTableItem } from './adminTable.interface'

const AdminTableItem: FC<IAdminTableItem> = ({ removeHandler, tableItem }) => {
	return (
		<div className={styles.table__row}>
			{tableItem.items.map((value) => (
				<div key={value}>{value}</div>
			))}
			<AdminTableActions
				editUrl={tableItem.editUrl}
				removeHandler={removeHandler}
			/>
		</div>
	)
}

export default AdminTableItem
