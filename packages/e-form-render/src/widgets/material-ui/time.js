import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import TextField from '@mui/material/TextField';

const time = ({ schema, value, onChange }) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<TimePicker
				label={schema.title || 'Time'}
				required={schema.required || false}
				value={value}
				onChange={onChange}
				renderInput={(params) => (
					<TextField
						{...params}
						fullWidth={schema.fullWidth || true}
						size={schema.size || 'small'}
					/>
				)}
			/>
		</LocalizationProvider>
	);
};

export default time;

export const timeSetting = {
	text: '时间',
	name: 'time',
	schema: {
		title: '时间',
		type: 'any',
		widget: 'time',
	},
	setting: {},
};
