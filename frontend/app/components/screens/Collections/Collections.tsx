import { FC } from 'react'

import Heading from '@/components/ui/Heading/Heading'

import Meta from '@/utils/meta/Meta'

import styles from './Collections.module.scss'
import CollectionsItem from './CollectionsItem'
import { ICollection } from './collections.interface'

const Collections: FC<{ collections: ICollection[] }> = ({ collections }) => {
	return (
		<Meta title="Genres">
			<Heading title="По жанрам" />
			<section className={styles.collections}>
				{collections.map((collection) => (
					<CollectionsItem
						key={collection._id}
						collection={collection}
					/>
				))}
			</section>
		</Meta>
	)
}

export default Collections
