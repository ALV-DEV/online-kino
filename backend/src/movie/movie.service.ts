import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { MovieDto } from './dto/movie.dto'
import { MovieModel } from './movie.model'
import { Types } from 'mongoose'
import { TelegramService } from 'src/telegram/telegram.service'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel)
		private readonly MovieModel: ModelType<MovieModel>,
		private readonly TelegramService: TelegramService,
	) {}

	async byId(_id: string) {
		const movie = await this.MovieModel.findById(_id).exec()
		if (!movie) {
			throw new NotFoundException('Такого фильма не существует')
		}
		return movie
	}

	async bySlug(slug: string) {
		const movie = await this.MovieModel.findOne({ slug })
			.populate('actors genres')
			.exec()

		if (!movie) {
			throw new NotFoundException('Такого фильма не существует')
		}
		return movie
	}

	async byActor(actorId: string) {
		const movie = await this.MovieModel.findOne({ actors: actorId }).exec()

		if (!movie) {
			throw new NotFoundException('Такого фильма не существует')
		}
		return movie
	}

	async byGenres(genresId: string[]) {
		const genresIdToObjectId = genresId.map(
			(_id) => new Types.ObjectId(_id),
		)
		const movies = await this.MovieModel.find({
			genres: { $in: genresIdToObjectId },
		}).exec()

		if (!movies) {
			throw new NotFoundException('Такого фильма не существует')
		}
		return movies
	}

	async updateCountOpened(slug: string) {
		const updatedMovie = await this.MovieModel.findOneAndUpdate(
			{ slug },
			{ $inc: { countOpened: 1 } },
			{ new: true },
		).exec()

		if (!updatedMovie) {
			throw new NotFoundException('Такого фильма не существует')
		}
		return updatedMovie
	}

	async create() {
		const defaultValue: MovieDto = {
			actors: [],
			bigPoster: '',
			genres: [],
			poster: '',
			slug: '',
			title: '',
			videoUrl: '',
		}
		const movie = await this.MovieModel.create(defaultValue)
		return movie._id
	}

	async update(_id: string, dto: MovieDto) {
		const updatedMovie = await this.MovieModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec()
		if (!updatedMovie) {
			throw new NotFoundException('Такого фильма не существует')
		}
		if (!updatedMovie.isSendTelegramm) {
			await this.sendNotification(dto)
			updatedMovie.isSendTelegramm = true
			await updatedMovie.save()
		}
		return updatedMovie
	}

	async getMostPopular() {
		return this.MovieModel.find({ countOpened: { $gt: 0 } })
			.sort({ countOpened: -1 })
			.populate('genres')
			.exec()
	}

	async getAll(searchTerm?: string) {
		let options = {}
		if (searchTerm) {
			options = {
				$or: [
					{
						title: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return this.MovieModel.find(options)
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	}

	async delete(_id: string) {
		const deletedMovie = await this.MovieModel.findByIdAndDelete(_id).exec()
		if (!deletedMovie) {
			throw new NotFoundException('Такого фильма не существует')
		}
		return deletedMovie
	}

	async updateRating(id: string, newRating: number) {
		return this.MovieModel.findByIdAndUpdate(
			id,
			{ rating: newRating },
			{ new: true },
		).exec()
	}

	async sendNotification(dto: MovieDto) {
		await this.TelegramService.sendPhoto(
			'https://labirint42.ru/wp-content/uploads/2020/11/28yqoj9ukog.jpg',
		)
		await this.TelegramService.sendMessage(`<b>${dto.title}</b>`, {
			reply_markup: {
				inline_keyboard: [
					[
						{
							url: 'https://www.youtube.com/watch?v=iSCJv2AMt-Y&t=8s',
							text: 'Смотреть',
						},
					],
				],
			},
		})
	}
}
