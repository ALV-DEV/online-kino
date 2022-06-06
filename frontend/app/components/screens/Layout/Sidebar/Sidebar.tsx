import MovieContainer from './Movies/MovieContainer'
import Search from './Search/Search'
import styles from './Sidebar.module.scss'

const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<Search />
			<MovieContainer />
		</div>
	)
}

export default Sidebar
