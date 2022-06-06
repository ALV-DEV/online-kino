import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

import logoImage from '@/assets/images/logoKino.png'

import { titleMerge } from '@/config/seo.config'

import { ISeo } from './meta.interface'

const Meta: FC<PropsWithChildren<ISeo>> = ({
	children,
	title,
	description,
	image,
}) => {
	const { asPath } = useRouter()
	const currentUrl = `${process.env.APP_URL}/${asPath}`
	return (
		<>
			<Head>
				<title itemProp="headline">{titleMerge(title)}</title>
				{description ? (
					<>
						<meta
							itemProp="description"
							name="description"
							content={description}
						/>
						<link rel="canonical" href={currentUrl} />
						<meta
							property="og:image"
							content={image || String(logoImage)}
						/>
					</>
				) : (
					<meta name="robots" content="noindex, nofollow" />
				)}
			</Head>
			{children}
		</>
	)
}

export default Meta
