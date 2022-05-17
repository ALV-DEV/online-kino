import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	readonly email: string

	@IsString()
	@MinLength(6, { message: 'Минимальная длина 6 символов' })
	readonly password: string
}
