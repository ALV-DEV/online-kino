import { toastr } from 'react-redux-toastr'

import Heading from '@/components/ui/Heading/Heading'

import Meta from '@/utils/meta/Meta'

function HomePage() {
	return (
		<Meta
			title="Главная"
			description="Кино, мультфильмы в хорошем качестве, с хорошим звуком и без рекламы. Просмотр на сайте в формате Full HD 720 и 1080 на телевизоре SmartTV в Ultra HD 4K. Можно скачать фильм на мобильное устройство и взять с собой."
		>
			<Heading title="Смотри кино онлайн" className="mb-8" />
			<button onClick={() => toastr.success('Auht', 'Auth success !!!')}>
				adsfafg
			</button>
		</Meta>
	)
}

export default HomePage
