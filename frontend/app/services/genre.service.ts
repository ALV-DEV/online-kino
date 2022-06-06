import instance, { $api } from 'api/interceptors'

import { IGerneEdit } from '@/components/screens/admin/Genres/edit/GenreEdit.interface'

import { IGenre } from '@/shared/types/movie.types'

import { getGenrehUrl } from '@/config/api.config'

class GenreService {
	async getPopularGenres() {
		return $api.get<IGenre[]>(getGenrehUrl())
	}

	async getGenres(searchTerm?: string) {
		return $api.get<IGenre[]>(getGenrehUrl(), {
			params: searchTerm ? { searchTerm } : {},
		})
	}

	async getById(id: string) {
		return instance.get<IGenre>(getGenrehUrl(`/${id}`))
	}

	async deleteGenre(id: string) {
		return instance.delete<IGenre>(getGenrehUrl(`/${id}`))
	}

	async update(id: string, data: IGerneEdit) {
		return instance.put<IGenre>(getGenrehUrl(`/${id}`), data)
	}
}

export default new GenreService()
