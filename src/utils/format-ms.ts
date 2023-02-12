export function formatMs(time: number) {
	const seconds = (Math.floor((time / 1000) % 60))
	const	minutes = Math.floor((time / (60000)) % 60)

	const format = (x: number) => x.toString().padStart(2, '0')

	return [format(minutes), format(seconds)].join(':')
}
