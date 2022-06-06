import AdminTable from '@/components/ui/AdminTable/AdminTable'
import Heading from '@/components/ui/Heading/Heading'
import AdminHeader from '@/components/ui/admin-header/AdminHeader'

import Meta from '@/utils/meta/Meta'

import AdminNavigation from '../admin-navigation/AdminNavigation'

import useActorsAdmin from './useActorsAdmin'

const ActorsAdmin = () => {
	const { data, deleteAsync, isLoading, searchTerm, handleSearch } =
		useActorsAdmin()
	return (
		<Meta title="Actors">
			<AdminNavigation />
			<Heading title="Актеры" />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				headerItems={['Имя', 'Количество фильмов']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default ActorsAdmin
