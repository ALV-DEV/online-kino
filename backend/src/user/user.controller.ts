import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Put,
	Query,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User } from './decorators/user.decorator'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UserModel } from './user.model'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly UserSrvise: UserService) {}

	@Get('profile')
	@Auth()
	async byId(@User('_id') _id: string) {
		return this.UserSrvise.byId(_id)
	}

	@Put('profile')
	@Auth()
	async updateUser(@User('_id') _id: string, @Body() dto: UpdateUserDto) {
		return this.UserSrvise.updateUser(_id, dto)
	}

	@Put('profile/favorites')
	@Auth()
	async toggleFavorites(
		@User() user: UserModel,
		@Body('movieId') movieId: string,
	) {
		return this.UserSrvise.toggleFavorites(movieId, user)
	}

	@Get('profile/favorites')
	@Auth()
	async getFavorites(@User('id') _id: string) {
		return this.UserSrvise.getFavorites(_id)
	}

	@Put('profile/:id')
	@Auth('admin')
	async updateUserIsAdmin(
		@Param('id') _id: string,
		@Body() dto: UpdateUserDto,
	) {
		return this.UserSrvise.updateUser(_id, dto)
	}

	@Get()
	@Auth('admin')
	async getAllUsers(@Query('searchTerm') searchTerm?: string) {
		return this.UserSrvise.getAll(searchTerm)
	}

	@Get('count')
	@Auth('admin')
	async getCountUsers() {
		return this.UserSrvise.getCountUsers()
	}

	@Get('profile/:id')
	@Auth('admin')
	async getProfile(@Param('id') _id: string) {
		return this.UserSrvise.byId(_id)
	}

	@Delete('profile/:id')
	@Auth('admin')
	async deleteUser(@Param('id') _id: string) {
		return this.UserSrvise.deleteUser(_id)
	}
}
