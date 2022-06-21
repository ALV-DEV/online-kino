export const APP_URL = `${process.env.APP_URL}/api`
export const APP_SERVER_URL = `${process.env.APP_SERVER_URL}/api`

export const getAuthUrl = (str: string = '') => `/auth/${str}`
export const getUserhUrl = (str: string = '') => `/users/${str}`
export const getMoviehUrl = (str: string = '') => `/movie/${str}`
export const getGenrehUrl = (str: string = '') => `/genre/${str}`
export const getActorhUrl = (str: string = '') => `/actor/${str}`
export const getRatinghUrl = (str: string = '') => `/rating/${str}`
