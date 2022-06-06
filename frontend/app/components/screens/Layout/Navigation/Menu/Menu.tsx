import React from 'react'
import { FC } from 'react'

import styles from './Menu.module.scss'
import MenuItem from './MenuItem'
import { IMenu } from './menu.interface'

const Menu: FC<{ menu: IMenu }> = ({ menu }) => {
	return (
		<div className={styles.menu}>
			<h2 className={styles.menu__title}>{menu.title}</h2>
			<nav className={styles.menu__navigation}>
				<ul className={styles.menu__list}>
					{menu.items.map((item) => (
						<MenuItem item={item} key={item.link} />
					))}
				</ul>
			</nav>
		</div>
	)
}

export default Menu
