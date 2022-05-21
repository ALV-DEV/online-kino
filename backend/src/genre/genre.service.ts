import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { MovieService } from 'src/movie/movie.service'
import { GenreDto } from './dto/genre.dto'
import { GenreModel } from './genre.model'

@Injectable()
export class GenreService {
	constructor(
		@InjectModel(GenreModel)
		private readonly GenreModel: ModelType<GenreModel>,
		private readonly MovieService: MovieService,
	) {}

	async byId(_id: string) {
		const genre = await this.GenreModel.findById(_id)
		if (!genre) {
			throw new NotFoundException('Жанр не найден')
		}
		return genre
	}

	async update(_id: string, dto: GenreDto) {
		return this.GenreModel.findByIdAndUpdate(_id, dto, { new: true }).exec()
	}

	async delete(_id: string) {
		return this.GenreModel.findByIdAndDelete(_id).exec()
	}

	async getAll(searchTerm?: string) {
		let option = {}
		if (searchTerm) {
			option = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						slug: new RegExp(searchTerm, 'i'),
					},
					{
						description: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}
		return this.GenreModel.find(option)
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	}

	async bySlug(slug: string) {
		return this.GenreModel.findOne({ slug }).exec()
	}

	async create() {
		const defaultValue: GenreDto = {
			description: '',
			icon: '',
			name: '',
			slug: '',
		}

		const genre = await this.GenreModel.create(defaultValue)
		return genre._id
	}

	async getCollection() {
		const genres = await this.getAll()
		const collections = await Promise.all(
			genres.map(async (genre) => {
				const moviesByGenre = await this.MovieService.byGenres([
					String(genre._id),
				])

				return {
					_id: String(genre._id),
					image: moviesByGenre[0]?.bigPoster
						? moviesByGenre[0].bigPoster
						: '',
					slug: genre.slug,
					title: genre.name,
				}
			}),
		)
		return collections
	}
}
