import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { INavItem } from './AdminNavigation.inteface'
import styles from './AdminNavigation.module.scss'

const AdminNavigationItem: FC<{ item: INavItem }> = ({
	item: { link, title },
}) => {
	const { asPath } = useRouter()

	return (
		<li className={styles['admin-navigation__item']}>
			<Link href={link}>
				<a
					className={cn({
						[styles.active]: asPath === link,
					})}
				>
					{title}
				</a>
			</Link>
		</li>
	)
}

export default AdminNavigationItem
