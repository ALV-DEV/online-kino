import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import logoImage from '@/assets/images/logoKino.png'

const Logo: FC = () => {
	return (
		<Link href={'/'}>
			<a className="px-layout mb-10 flex items-center">
				<Image
					src={logoImage}
					width={34}
					height={34}
					alt="logo"
					draggable={false}
				/>
				<h2 className="text-lg text-white ml-4 uppercase font-bold">
					online-kino
				</h2>
			</a>
		</Link>
	)
}

export default Logo
