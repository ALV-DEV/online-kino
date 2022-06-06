import styles from '../Admin.module.scss'

import CountUser from './CountUser'
import PopularMovie from './PopularMovie'

const Statistics = () => {
	return (
		<div className={styles.admin__statistics}>
			<CountUser />
			<PopularMovie />
		</div>
	)
}

export default Statistics
