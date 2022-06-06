interface IItemGenre {
	name: string
}

export const getGenresList = (array: IItemGenre[]) =>
	array.map((item) => item.name).join(', ')
