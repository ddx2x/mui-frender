import { Switch } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

const switchWidget = ({ schema, value, onChange }) => {
	const props = {
		size: schema.size || 'small',
	};

	return (
		<FormControl component='fieldset' variant='standard'>
			<Switch
				checked={value}
				onChange={(event) => onChange(event.target.checked)}
				inputProps={{ 'aria-label': 'controlled' }}
				{...props}
			/>
			<FormHelperText>{schema.helperText || ''}</FormHelperText>
		</FormControl>
	);
};

export default switchWidget;

export const switchSetting = {
	text: '是否选择',
	name: 'switchWidget',
	schema: {
		title: '是否选择',
		type: 'boolean',
		widget: 'switchWidget',
		required: true,
	},
	setting: {
		required: {
			title: '必填',
			type: 'boolean',
		},
		size: {
			title: '尺寸',
			type: 'any',
			widget: 'select',
			enum: ['medium', 'small'],
			enumNames: ['medium', 'small'],
			default: 'small',
		},
		labelPlacement: {
			title: '定位',
			type: 'any',
			widget: 'select',
			enum: ['start', 'end', 'top', 'bottom'],
			enumNames: ['start', 'end', 'top', 'bottom'],
			default: 'start',
		},
		default: {
			title: '默认选中',
			type: 'boolean',
			default: true,
		},
	},
};
