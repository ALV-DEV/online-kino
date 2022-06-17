import { FC } from 'react'
import { toastr } from 'react-redux-toastr'

import Gallery from '@/components/ui/Gallery/Gallery'
import { IGalleryItem } from '@/components/ui/Gallery/gallery.interface'
import Heading from '@/components/ui/Heading/Heading'
import SubHeading from '@/components/ui/Heading/SubHeading'
import Slider from '@/components/ui/Slider/Slider'
import { ISlide } from '@/components/ui/Slider/slider.interface'

import Meta from '@/utils/meta/Meta'

export interface IHome {
	slides: ISlide[]
	trandingMovies: IGalleryItem[]
	trandingActors: IGalleryItem[]
}

const HomePage: FC<IHome> = ({ slides, trandingActors, trandingMovies }) => {
	return (
		<Meta
			title="Главная"
			description="Кино, мультфильмы в хорошем качестве, с хорошим звуком и без рекламы. Просмотр на сайте в формате Full HD 720 и 1080 на телевизоре SmartTV в Ultra HD 4K. Можно скачать фильм на мобильное устройство и взять с собой."
		>
			<Heading title="Смотри кино онлайн" className="mb-8" />
			{slides.length && <Slider slides={slides} />}
			<div className="mt-10">
				<SubHeading title="Фильмы в тренде" />
				{trandingMovies?.length && <Gallery items={trandingMovies} />}
			</div>
			<div className="mt-10">
				<SubHeading title="Популярные актёры" />
				{trandingActors?.length && <Gallery items={trandingActors} />}
			</div>
		</Meta>
	)
}

export default HomePage
