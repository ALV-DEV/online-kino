import { ConfigService } from '@nestjs/config'
import { Telegram } from 'src/telegram/telegram.interface'

export const getTelCongig = (configService: ConfigService): Telegram => ({
	chatId: configService.get('CHAT_ID'),
	token: configService.get('TELEGRAM_TOKEN'),
})
