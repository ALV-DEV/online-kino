import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { hash } from 'bcryptjs'
import { InjectModel } from 'nestjs-typegoose'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UserModel } from './user.model'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel)
		private readonly UserModel: ModelType<UserModel>,
	) {}

	async byId(_id: string) {
		const user = await this.UserModel.findById(_id, '-password')
		if (!user) {
			throw new NotFoundException('Такой пользователь не зарегистрирован')
		}
		return user
	}

	async updateUser(_id: string, dto: UpdateUserDto) {
		const user = await this.byId(_id)
		const isSameUser = await this.UserModel.findOne({ email: dto.email })
		if (isSameUser && String(_id) !== String(isSameUser._id)) {
			throw new NotFoundException('Пользователь с таким Email уже занят')
		}

		if (dto.password) {
			const newHashPassword = await hash(dto.password, 5)
			user.password = newHashPassword
		}
		if (dto.email) {
			user.email = dto.email
		}
		if (dto.isAdmin || dto.isAdmin === false) {
			user.isAdmin = dto.isAdmin
		}

		await user.save()
		return {
			message: 'Данные обновлены',
		}
	}

	async getCountUsers() {
		return this.UserModel.find().count().exec()
	}

	async getAll(searchTerm?: string) {
		let options = {}
		if (searchTerm) {
			options = {
				$or: [
					{
						email: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return this.UserModel.find(options)
			.select('-password -updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	}

	async deleteUser(id: string) {
		return this.UserModel.findByIdAndDelete(id).exec()
	}
}
