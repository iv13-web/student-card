import {FC} from 'react'
import TextField from '@mui/material/TextField'
import {useFormContext, Controller} from 'react-hook-form'

interface IFormInput {
	type?: string
	label: string
	defaultValue: string | number | undefined
	name: string
}

export const FormInput: FC<IFormInput> = ({label, defaultValue, name, type}) => {
	const {control, formState: {errors}} = useFormContext()
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({field}) => (
				<TextField
					{...field}
					type={type ? type : 'text'}
					fullWidth
					autoComplete='off'
					margin='normal'
					label={label}
					error={!!errors[name]}
					helperText={errors[name]?.message}
				/>
			)}
		/>
	)
}
