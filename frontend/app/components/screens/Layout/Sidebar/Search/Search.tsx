import SearchField from '@/components/ui/SearchField/SearchField'

import SearchList from './SearchList/SearchList'
import styles from './Serach.module.scss'
import useSearch from './useSearch'

const Search = () => {
	const { data, handleSearch, isSuccess, searchTerm } = useSearch()
	return (
		<div className={styles.search__wrapper}>
			<SearchField handleSearch={handleSearch} searchTerm={searchTerm} />
			{isSuccess && <SearchList movies={data || []} />}
		</div>
	)
}

export default Search
