import { FC, PropsWithChildren } from 'react'

import styles from './Layout.module.scss'
import Navigation from './Navigation/Navigation'
import Sidebar from './Sidebar/Sidebar'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Navigation />
			<div className={styles.layout__content}>{children}</div>
			<Sidebar />
		</div>
	)
}

export default Layout
