import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';

const date = ({ schema, value, onChange }) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DesktopDatePicker
				label={schema.title || 'Date'}
				inputFormat={schema.inputFormat || 'MM/dd/yyyy'}
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

export default date;
export const dateSetting = {
	text: '日期选择器',
	name: 'date',
	schema: {
		title: '日期选择器',
		type: 'any',
		widget: 'date',
	},
	setting: {
		widget: {
			title: '格式',
			type: 'any',
			widget: 'select',
			enum: ['date', 'time'],
			enumNames: ['日期', '时间'],
			default: 'date',
		},
		required: {
			title: '必填',
			type: 'boolean',
		},
		inputFormat: {
			title: '日期格式',
			type: 'string',
			default: 'MM/dd/yyyy',
		},
		size: {
			title: '尺寸',
			type: 'any',
			widget: 'select',
			enum: ['medium', 'small'],
			enumNames: ['medium', 'small'],
			default: 'small',
		},
		width: {
			title: '元素宽度',
			type: 'string',
			placeholder: 'eg 50%',
		},
	},
};
