import '../styles/session-control.css'

interface SessionControlProps {
	title: string
	min: number
	max: number
	value: number
	onChange: (newValue: number) => void
}

export function SessionControl({ title, min, max, value, onChange }: SessionControlProps) {
	function decrement() {
		if (value > min)
			onChange(value - 1)
	}

	function increment() {
		if (value < max)
			onChange(value + 1)
	}

	return (
		<div className='session-control'>
			<h3>{ title }</h3>

			<div className='value-control'>
				<button onClick={decrement}>
					<i className='fas fa-minus' />
				</button>

				<span>{ value } min</span>

				<button onClick={increment}>
					<i className='fas fa-plus' />
				</button>
			</div>
		</div>
	)
}
