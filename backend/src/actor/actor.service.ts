import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { ActorModel } from './actor.model'
import { ActorDto } from './dto/actor.dto'

@Injectable()
export class ActorService {
	constructor(
		@InjectModel(ActorModel)
		private readonly ActorModel: ModelType<ActorModel>,
	) {}

	async byId(id: string) {
		return this.ActorModel.findById(id).exec()
	}

	async bySlug(slug: string) {
		return this.ActorModel.findOne({ slug }).exec()
	}

	async create() {
		const defaultValue: ActorDto = {
			name: '',
			photo: '',
			slug: '',
		}

		const actor = await this.ActorModel.create(defaultValue)
		return actor._id
	}

	async update(_id: string, dto: ActorDto) {
		const updatedActor = await this.ActorModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec()

		if (!updatedActor) {
			throw new NotFoundException('Актер не найден')
		}

		return updatedActor
	}

	async getAll(searchTerm?: string) {
		let options = {}
		if (searchTerm) {
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						slug: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return this.ActorModel.aggregate()
			.match(options)
			.lookup({
				from: 'Movie',
				foreignField: 'actors',
				localField: '_id',
				as: 'movies',
			})
			.addFields({ countMovies: { $size: '$movies' } })
			.sort({ createdAt: -1 })
			.project({ __v: 0, updatedAt: 0, movies: 0 })
			.exec()
	}

	async delete(_id: string) {
		const deleteActor = await this.ActorModel.findByIdAndDelete(_id).exec()

		if (!deleteActor) {
			throw new NotFoundException('Актер не найден')
		}

		return deleteActor
	}
}
