import { useState, useEffect, useRef } from 'react'

import { Clock } from './components/Clock'
import { SessionControl } from './components/SessionControl'
import notification from './assets/notification.mp3'
import './styles/app.css'

type Session = 'Trabalho' | 'Descanso'

export function App() {
	const [workTime, setWorkTime] = useState(25)
	const [breakTime, setBreakTime] = useState(5)
	const [running, setRunning] = useState(false)
	const [timeLeft, setTimeLeft] = useState(0)
	const [currentSession, setCurrentSession] = useState<Session>('Trabalho')
	const [timeoutId, setTimeoutId] = useState<number>()

	const audioRef = useRef<HTMLAudioElement>(null)

	const minutesToMs = (minutes: number) => minutes * 60 * 1000

	useEffect(() => {
		reset()
	}, [workTime, breakTime])

	useEffect(() => {
		if (running) {
			if (timeLeft === 0) {
				if (audioRef.current)
					audioRef.current.play()

				if (currentSession === 'Trabalho') {
					setCurrentSession('Descanso')
					setTimeLeft(minutesToMs(breakTime))
				} else {
					setCurrentSession('Trabalho')
					setTimeLeft(minutesToMs(workTime))
				}

				return
			}

			const id = setTimeout(() => {
				setTimeLeft(state => state - 1000)
			}, 1000)

			setTimeoutId(id)
		} else
			clearTimeout(timeoutId)
	}, [running, timeLeft])

	function reset() {
		setRunning(false)
		setTimeLeft(minutesToMs(workTime))
		setCurrentSession('Trabalho')
	}

	return (
		<>
			<h1>Pomodoro Timer</h1>

			<div className='pomodoro-container'>
				<Clock
					time={timeLeft}
					session={currentSession}
					running={running}
					onToggle={() => setRunning(!running)}
					onReset={reset}
				/>

				<div className='settings'>
					<SessionControl
						title='Trabalho'
						min={10}
						max={50}
						value={workTime}
						onChange={value => setWorkTime(value)}
					/>

					<SessionControl
						title='Descanso'
						min={1}
						max={9}
						value={breakTime}
						onChange={value => setBreakTime(value)}
					/>
				</div>

				<audio src={notification} ref={audioRef} />
			</div>
		</>
	)
}
