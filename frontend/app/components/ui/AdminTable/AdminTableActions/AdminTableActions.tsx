import { useRouter } from 'next/router'
import { FC } from 'react'

import MaterialIcon from '../../MaterialIcon'

import styles from './AdminTableActions.module.scss'

interface IAdmitAction {
	editUrl: string
	removeHandler: () => void
}

const AdminTableActions: FC<IAdmitAction> = ({ editUrl, removeHandler }) => {
	const { push } = useRouter()

	return (
		<div className={styles.action}>
			<button onClick={() => push(editUrl)}>
				<MaterialIcon name="MdEdit" />
			</button>
			<button onClick={removeHandler}>
				<MaterialIcon name="MdClose" />
			</button>
		</div>
	)
}

export default AdminTableActions
