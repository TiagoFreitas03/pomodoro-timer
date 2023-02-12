import { formatMs } from '../utils/format-ms'
import '../styles/clock.css'

interface ClockProps {
	time: number
	session: string
	running: boolean
	onToggle: () => void
	onReset: () => void
}

export function Clock({ time, session, running, onToggle, onReset }: ClockProps) {
	const toggleIcon = running ? 'pause' : 'play'

	return (
		<div className='clock'>
			<h2>{ session }</h2>

			<span>{formatMs(time)}</span>

			<div>
				<button onClick={onToggle}>
					<i className={`fas fa-${toggleIcon}`} /> {running ? 'Pausar' : 'Iniciar'}
				</button>

				<button onClick={onReset}>
					<i className='fas fa-rotate' /> Reiniciar
				</button>
			</div>
		</div>
	)
}
