import { FC } from "react"
import { navItems } from "./AdminNavigation.data"
import styles from './AdminNavigation.module.scss'
import AdminNavigationItem from "./AdminNavigationItem"

const AdminNavigation: FC = () => {
	return <nav className={styles['admin-navigation__nav']}>
		<ul className={styles['admin-navigation__list']}>
			{
				navItems.map(item => <AdminNavigationItem key={item.link} item={item}/> )
			}
		</ul>
	</nav>
}

export default AdminNavigation
