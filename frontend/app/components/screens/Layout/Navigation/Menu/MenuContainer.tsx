import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import MaterialIcon from '@/components/ui/MaterialIcon'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import Menu from './Menu'
import Genres from './genres/Genres'
import { firstMenu, userMenu, userMenuAuth } from './menu.data'

const MenuContainer = () => {
	const { user } = useAuth()
	const { logout } = useActions()
	const { push } = useRouter()
	const [menuAuth, setMenuAuth] = useState(userMenuAuth)
	const logouteRedirect = () => {
		logout()
		push('/auth')
	}

	const MenuDynamic = dynamic(() => import('./Menu'), { ssr: false })

	useEffect(() => {
		if (user?.isAdmin) {
			setMenuAuth((prev) => ({
				...prev,
				items: [
					...prev.items,
					{
						icon: 'MdOutlineLooks',
						link: '/manage',
						title: 'Админ панель',
					},
				],
			}))
		} else {
			setMenuAuth(userMenuAuth)
		}
	}, [])

	return (
		<div>
			<MenuDynamic menu={firstMenu} />
			<Genres />
			<>
				{user ? (
					<>
						<MenuDynamic menu={menuAuth} />
						<button
							onClick={logouteRedirect}
							className="flex items-center text-2lg text-gray-600 cursor-pointer hover:text-white px-layout"
						>
							<MaterialIcon name="MdLogout" />
							<span className="ml-3 pb-1">Выйти</span>
						</button>
					</>
				) : (
					<>
						<MenuDynamic menu={userMenu} />
					</>
				)}
			</>
		</div>
	)
}

export default MenuContainer
