import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { getTelCongig } from 'src/config/telegram.config'
import { Telegraf } from 'telegraf'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'
import { Telegram } from './telegram.interface'

@Injectable()
export class TelegramService {
	bot: Telegraf
	options: Telegram
	constructor(private readonly configService: ConfigService) {
		this.options = getTelCongig(this.configService)
		this.bot = new Telegraf(this.options.token)
	}

	async sendMessage(
		msg: string,
		options?: ExtraReplyMessage,
		chatId: string = this.options.chatId,
	) {
		await this.bot.telegram.sendMessage(chatId, msg, {
			parse_mode: 'HTML',
			...options,
		})
	}

	async sendPhoto(
		photo: string,
		msg?: string,
		chatId: string = this.options.chatId,
	) {
		await this.bot.telegram.sendPhoto(
			chatId,
			photo,
			msg
				? {
						caption: msg,
				  }
				: {},
		)
	}
}
