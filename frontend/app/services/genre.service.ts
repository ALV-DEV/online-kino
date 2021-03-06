import instance, { $api } from 'api/interceptors'

import { ICollection } from '@/components/screens/Collections/collections.interface'
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

	async getBySlug(slug: string) {
		return $api.get<IGenre>(getGenrehUrl(`/by-slug/${slug}`))
	}

	async create() {
		return instance.post<string>(getGenrehUrl(`/`))
	}
	async deleteGenre(id: string) {
		return instance.delete<IGenre>(getGenrehUrl(`/${id}`))
	}

	async update(id: string, data: IGerneEdit) {
		return instance.put<IGenre>(getGenrehUrl(`/${id}`), data)
	}

	async getCollections() {
		return $api.get<ICollection[]>(getGenrehUrl('/collections'))
	}
}

export default new GenreService()
