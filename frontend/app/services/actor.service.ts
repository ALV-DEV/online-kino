import instance, { $api } from 'api/interceptors'

import { IActor } from '@/shared/types/movie.types'

import { getActorhUrl } from '@/config/api.config'

class GenreService {
	async getActors(searchTerm?: string) {
		return $api.get<IActor[]>(getActorhUrl(), {
			params: searchTerm ? { searchTerm } : {},
		})
	}

	async deleteActor(id: string) {
		return instance.delete<IActor>(getActorhUrl(`/${id}`))
	}
}

export default new GenreService()
