import AdminTable from '@/components/ui/AdminTable/AdminTable'
import Heading from '@/components/ui/Heading/Heading'
import AdminHeader from '@/components/ui/admin-header/AdminHeader'

import Meta from '@/utils/meta/Meta'

import AdminNavigation from '../admin-navigation/AdminNavigation'

import useGenresAdmin from './useGenresAdmin'

const GenresAdmin = () => {
	const { data, deleteAsync, isLoading, searchTerm, handleSearch } =
		useGenresAdmin()
	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Жанры" />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				headerItems={['Название', 'SLUG']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default GenresAdmin
