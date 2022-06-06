import Users from '@/components/screens/admin/Users/Users'
import { NextPageAuth } from '@/shared/types/auth.types'
import React from 'react'

const UsersPage:NextPageAuth = () => {
  return (
    <div>
      <Users/>
    </div>
  )
}


UsersPage.isOnlyAdmin = true

export default UsersPage