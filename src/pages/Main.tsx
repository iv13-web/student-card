import {FC} from 'react'
import {Button, Container, Typography} from '@mui/material'
import {useHistory} from 'react-router-dom'

export const Main: FC = () => {
	const history = useHistory()

	return (
		<Container>
			<Typography variant='h4' sx={{mt: 4, mb:2}}>
				Карточка студента
			</Typography>
			<Typography sx={{mb:2}}>
				нет данных
			</Typography>
			<Button
				variant='contained'
				onClick={() => history.push('/create')}
			>
				Добавить
			</Button>
		</Container>
	)
}
