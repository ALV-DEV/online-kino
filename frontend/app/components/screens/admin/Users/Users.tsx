import AdminTable from '@/components/ui/AdminTable/AdminTable'
import Heading from '@/components/ui/Heading/Heading'
import AdminHeader from '@/components/ui/admin-header/AdminHeader'

import Meta from '@/utils/meta/Meta'

import AdminNavigation from '../admin-navigation/AdminNavigation'

import useUsers from './useUsers'

const Users = () => {
	const { data, deleteAsync, isLoading, searchTerm, handleSearch } =
		useUsers()
	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Пользователи" />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				headerItems={['Email', 'Дата регистрации']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default Users
