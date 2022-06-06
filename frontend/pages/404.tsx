import { NextPage } from 'next'
import React from 'react'

import Heading from '@/components/ui/Heading/Heading'

import Meta from '@/utils/meta/Meta'

const Error404: NextPage = () => {
	return (
		<Meta title="Page not found">
			<div>
				<Heading title="404 - Страница не найдена" />
			</div>
		</Meta>
	)
}

export default Error404
