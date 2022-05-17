import { IsString } from 'class-validator'

export class RefreshToken {
  @IsString()
  readonly refreshToken: string
}
