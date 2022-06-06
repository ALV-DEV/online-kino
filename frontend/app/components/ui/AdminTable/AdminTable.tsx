import { FC } from 'react'

import Loader from '../Loader/Loader'

import styles from './AdminTable.module.scss'
import AdminTableHeader from './AdminTableHeader'
import AdminTableItem from './AdminTableItem'
import { ITableItem } from './adminTable.interface'

interface IAdminTable {
	tableItems: ITableItem[]
	isLoading: boolean
	headerItems: string[]
	removeHandler: (id: string) => void
}

const AdminTable: FC<IAdminTable> = ({
	headerItems,
	isLoading,
	removeHandler,
	tableItems,
}) => {
	return (
		<div className={styles.table}>
			<AdminTableHeader headerItems={headerItems} />
			{isLoading ? (
				<Loader count={1} height={48} className={'mt-4'} />
			) : tableItems.length ? (
				tableItems.map((tableItem) => (
					<AdminTableItem
						removeHandler={() => removeHandler(tableItem._id)}
						tableItem={tableItem}
						key={tableItem._id}
					/>
				))
			) : (
				<div className={styles.table__row_notfoud}>
					Элементы не найдены
				</div>
			)}
		</div>
	)
}

export default AdminTable
