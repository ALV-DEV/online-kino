import { AuthGuard } from '@nestjs/passport/dist/auth.guard'

export class JwtAuthGuard extends AuthGuard('jwt') {}
