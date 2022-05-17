import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from 'src/user/user.model'
import { AuthDto } from './dto/auth.dto'
import { hash, compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { RefreshToken } from './dto/refreshToken.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel)
		private readonly UserModel: ModelType<UserModel>,
		private readonly JwtService: JwtService,
	) {}

	async register(dto: AuthDto) {
		const candidate = await this.UserModel.findOne({
			email: dto.email,
		}).exec()
		if (candidate) {
			throw new BadRequestException('Пользователь уже зарегистрирован')
		}

		const hashPassword = await hash(dto.password, 5)

		const newUser = new this.UserModel({
			email: dto.email,
			password: hashPassword,
		})

		const tokens = await this.issueTokenPair(String(newUser._id))
		await newUser.save()
		return {
			user: this.returnUserField(newUser),
			...tokens,
		}
	}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const tokens = await this.issueTokenPair(String(user._id))

		return {
			user: this.returnUserField(user),
			...tokens,
		}
	}

	async validateUser(dto: AuthDto): Promise<UserModel> {
		const user = await this.UserModel.findOne({ email: dto.email }).exec()
		if (!user) {
			console.log(dto.email)

			throw new UnauthorizedException('Неправильный пароль или Email')
		}
		const isValudPassword = await compare(dto.password, user.password)
		if (!isValudPassword) {
			throw new UnauthorizedException('Неправильный пароль или Email')
		}

		return user
	}

	async issueTokenPair(userId: string) {
		const data = { _id: userId }
		const refreshToken = await this.JwtService.signAsync(data, {
			expiresIn: '15d',
		})
		const accessToken = await this.JwtService.signAsync(data, {
			expiresIn: '1h',
		})

		return { refreshToken, accessToken }
	}

	returnUserField(user: UserModel) {
		return {
			_id: user._id,
			email: user.email,
			isAdmin: user.isAdmin,
		}
	}

	async getNewTokens({ refreshToken }: RefreshToken) {
		if (!refreshToken) {
			throw new UnauthorizedException('Войдите в систему')
		}

		const result = await this.JwtService.verifyAsync(refreshToken)
		if (!result) {
			throw new UnauthorizedException('Войдите в систему')
		}

		const user = await this.UserModel.findById(result._id)
		const tokens = await this.issueTokenPair(String(user._id))
		return {
			user: this.returnUserField(user),
			...tokens,
		}
	}
}
