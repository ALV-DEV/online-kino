import instance, { $api } from 'api/interceptors'

import { IActor } from '@/shared/types/movie.types'

import { getActorhUrl } from '@/config/api.config'

class ActorService {
	async getActors(searchTerm?: string) {
		return $api.get<IActor[]>(getActorhUrl(), {
			params: searchTerm ? { searchTerm } : {},
		})
	}

	async getById(id: string) {
		return instance.get<IActor>(getActorhUrl(`/${id}`))
	}

	async getBySlug(slug: string) {
		return $api.get<IActor>(getActorhUrl(`/by-slug/${slug}`))
	}

	async create() {
		return instance.post<string>(getActorhUrl(`/`))
	}

	async update(id: string, data: IActor) {
		return instance.put<IActor>(getActorhUrl(`/${id}`), data)
	}

	async deleteActor(id: string) {
		return instance.delete<IActor>(getActorhUrl(`/${id}`))
	}
}

export const getActors = async (searchTerm?: string) => {
	return $api.get<IActor[]>(getActorhUrl(), {
		params: searchTerm ? { searchTerm } : {},
	})
}

export default new ActorService()
