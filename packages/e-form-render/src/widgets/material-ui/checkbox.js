import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

const checkbox = ({ schema, checked, onChange }) => {
	return (
		<FormControl component='fieldset' variant='standard'>
			<FormControlLabel
				label={schema.title || 'boolean'}
				size={schema.size || 'small'}
				control={
					<Checkbox
						checked={checked}
						onChange={(event) => onChange(event.target.checked)}
					/>
				}
			/>
			<FormHelperText>{schema.helperText || ''}</FormHelperText>
		</FormControl>
	);
};

export default checkbox;
export const checkboxSetting = {
	text: '是否选中',
	name: 'boolean',
	schema: {
		title: '是否选中',
		type: 'boolean', //底层以此判断布局
		widget: 'checkbox',
	},
	setting: {
		width: {
			title: '元素宽度',
			type: 'string',
			placeholder: 'eg 50%',
		},
		default: {
			title: '默认选中',
			type: 'boolean',
			widget: 'checkbox',
			default: true,
		},
		helperText: {
			title: '提示',
			type: 'string',
		},
	},
};
