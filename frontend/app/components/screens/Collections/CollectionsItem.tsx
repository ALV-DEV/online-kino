import Link from 'next/link'
import { FC } from 'react'

import styles from './Collections.module.scss'
import CollectionsImage from './CollectionsImage'
import { ICollection } from './collections.interface'

const CollectionsItem: FC<{ collection: ICollection }> = ({ collection }) => {
	return (
		<Link href={`/genre/${collection.slug}`}>
			<a className={styles.collection}>
				<CollectionsImage collection={collection} />

				<div className={styles.collection__content}>
					<h3 className={styles.collection__title}>
						{collection.title}
					</h3>
				</div>

				<div className={`${styles.behind} ${styles.second}`}>
					<CollectionsImage collection={collection} />
				</div>

				<div className={`${styles.behind} ${styles.third}`}>
					<CollectionsImage collection={collection} />
				</div>
			</a>
		</Link>
	)
}

export default CollectionsItem
