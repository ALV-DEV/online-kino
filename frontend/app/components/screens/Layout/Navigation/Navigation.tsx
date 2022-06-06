import dynamic from 'next/dynamic'

import Logo from './Logo'
import MenuContainer from './Menu/MenuContainer'
import styles from './Navigation.module.scss'

const Navigation = () => {
	const DynamicMenuContainer = dynamic(() => import('./Menu/MenuContainer'), {
		ssr: false,
	})
	return (
		<div className={styles.naviagtion}>
			<Logo />
			<DynamicMenuContainer />
		</div>
	)
}

export default Navigation
