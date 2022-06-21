import { IProfileInput } from '@/components/screens/profile/profile.interface'

import { IMovie } from '@/shared/types/movie.types'
import { IUser } from '@/shared/types/user.types'

import { getUserhUrl } from '@/config/api.config'

import instance from '../api/interceptors'

class UserService {
	async getAll(searchTerm?: string) {
		return instance.get<IUser[]>(getUserhUrl(), {
			params: searchTerm ? { searchTerm } : {},
		})
	}

	async getProfileAuthUser() {
		return instance.get<IUser>(getUserhUrl('/profile'))
	}

	async updateProfile(data: IProfileInput) {
		return instance.put<string>(getUserhUrl('/profile'), data)
	}

	async getById(_id: string) {
		return instance.get<IUser>(getUserhUrl(`/profile/${_id}`))
	}

	async update(_id: string, data: IProfileInput) {
		return instance.put<string>(getUserhUrl(`/profile/${_id}`), data)
	}

	async deleteUser(_id: string) {
		return instance.delete<string>(getUserhUrl(`/profile/${_id}`))
	}

	async getFavorites() {
		return instance.get<{ _id: string; favorites: IMovie[] }>(
			getUserhUrl('/profile/favorites')
		)
	}

	async updateFavorites(movieId: string) {
		return instance.put(getUserhUrl('/profile/favorites'), { movieId })
	}
}

export default new UserService()
