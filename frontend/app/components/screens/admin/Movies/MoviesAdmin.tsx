import AdminTable from '@/components/ui/AdminTable/AdminTable'
import Heading from '@/components/ui/Heading/Heading'
import AdminHeader from '@/components/ui/admin-header/AdminHeader'

import Meta from '@/utils/meta/Meta'

import AdminNavigation from '../admin-navigation/AdminNavigation'

import useMoviesAdmin from './useMoviesAdmin'

const MoviesAdmin = () => {
	const {
		data,
		deleteAsync,
		isLoading,
		searchTerm,
		handleSearch,
		createAsync,
	} = useMoviesAdmin()
	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Фильмы" />
			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				headerItems={['Название', 'Жанры', 'Рейтинг']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default MoviesAdmin
