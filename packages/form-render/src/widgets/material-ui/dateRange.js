import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangePicker from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const dateRange = ({ schema, value, onChange }) => {
	const _value = Array.isArray(value) ? value : [null, null];

	return (
		<Box fullWidth>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DateRangePicker
					value={_value}
					allowSameDateSelection={true}
					inputFormat={schema.inputFormat || ''}
					toolbarTitle={schema.title || '日期选择'}
					startText={schema.startText || '起始时间'}
					endText={schema.endText || '结束时间'}
					onChange={(date, keyboardInputValue) => onChange(date)}
					renderInput={(startProps, endProps) => (
						<React.Fragment>
							<TextField
								{...startProps}
								fullWidth
								size={schema.size || 'small'}
							/>
							<Box sx={{ mx: 2 }}> to </Box>
							<TextField
								{...endProps}
								fullWidth
								size={schema.size || 'small'}
							/>
						</React.Fragment>
					)}
				/>
			</LocalizationProvider>
		</Box>
	);
};

export default dateRange;
export const dateRangeSetting = {
	text: '日期范围选择器',
	name: 'dateRange',
	schema: {
		title: '日期范围选择器',
		type: 'any',
		widget: 'dateRange',
	},
	setting: {
		startText: {
			title: '起始名称',
			type: 'string',
		},
		endText: {
			title: '结束名称',
			type: 'string',
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
