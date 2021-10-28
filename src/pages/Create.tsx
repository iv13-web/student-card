import {FC, useEffect} from 'react'
import {FormInput} from '../components/FormInput'
import {useForm, SubmitHandler, FormProvider} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {Container} from '@mui/material'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const FORM_INPUTS = [
	{
		label: 'Имя',
		defaultValue: '',
		name: 'name'
	},
	{
		label: 'Фамилия',
		defaultValue: '',
		name: 'surname'
	},
	{
		type: 'number',
		label: 'Год рождения',
		defaultValue: '',
		name: 'year'
	},
	{
		label: 'Потрфолио',
		defaultValue: '',
		name: 'portfolio'
	},
]

const schema = yup.object().shape({
	name: yup
		.string()
		.required('Поле "Имя" обязательно для заполнения')
		.min(2, 'Минимальная длина для поля "Имя" - 2 символа'),
	surname: yup
		.string()
		.required('Поле "Фамилия" обязательно для заполнения')
		.min(2, 'Минимальная длина для поля "Имя" - 2 символа'),
	year: yup
		.number()
		.typeError('Поле "Год рождения" обязательно для заполнения')
		.min(1900, 'Минимальный год - 1900')
		.max(new Date().getFullYear(), 'Введенный год не должен быть больше текущего'),
	portfolio: yup
		.string()
		.required('Поле "Портфолио" обязательно для заполнения')
		.url('Введите корректную ссылку')
})

interface IFormInputs {
	name: string
	surname: string
	year: number | string
	portfolio: string,
}

export const Create: FC = () => {
	const methods = useForm<IFormInputs>({resolver: yupResolver(schema), mode: 'all'})
	const {handleSubmit, formState: {isSubmitSuccessful}, reset} = methods
	const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
		localStorage.setItem('info', JSON.stringify(data))
	}

	useEffect(() => {
		if (isSubmitSuccessful) {
			const values = FORM_INPUTS
				.map(el => el.name)
				.reduce((a, v) => ({...a, [v]: ''}), {})
			reset(values)
		}
	}, [isSubmitSuccessful])

	return (
		<Container component='main' maxWidth='xs'>
			<Box sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
				<Typography component='h1' variant='h4' sx={{alignSelf: 'start'}}>
					Создать
				</Typography>

				<FormProvider {...methods}>
					<Box
						component='form'
						onSubmit={handleSubmit(onSubmit)}
						sx={{mt: 1, width: '100%'}}
					>
						{FORM_INPUTS.map(item => (
							<FormInput
								key={item.name}
								label={item.label}
								defaultValue={item.defaultValue}
								name={item.name}
								type={item.type}
							/>
						))}
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{mt: 3, mb: 2}}
						>
							Добавить
						</Button>
					</Box>
				</FormProvider>
			</Box>
		</Container>
	)
}
