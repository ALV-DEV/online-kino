import { IUser } from '@/shared/types/user.types'

import { getUserhUrl } from '@/config/api.config'

import instance from '../api/interceptors'

class UserService {
	async getAll(searchTerm?: string) {
		return instance.get<IUser[]>(getUserhUrl(), {
			params: searchTerm ? { searchTerm } : {},
		})
	}

	async deleteUser(_id: string) {
		return instance.delete<string>(getUserhUrl(`/profile/${_id}`))
	}
}

export default new UserService()
