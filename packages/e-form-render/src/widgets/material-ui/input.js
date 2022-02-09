import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

const input = ({ schema, value, onChange }) => {
	const adornment = (position, content) => {
		return (
			<InputAdornment hiddenLabel position={position}>
				{content}
			</InputAdornment>
		);
	};

	const props = {
		disabled: schema.disabled || false,
		label: schema.title || 'label',
		size: schema.size || 'small',
		variant: schema.variant || 'standard',
		required: schema.required || false,
		type: schema.html5type || 'text',
		helperText: schema.helperText || '',
		placeholder: schema.placeholder || '',
		color: schema.color || 'primary',
		multiline: schema.multiline || false,
		maxRows: schema.maxRows || '5',
		minRows: schema.minRows || '1',
		margin: 'dense',
		InputProps: {
			startAdornment: schema.startAdornment
				? adornment('start', schema.startAdornment)
				: null,
			endAdornment: schema.endAdornment
				? adornment('end', schema.endAdornment)
				: null,
		},
	};

	return (
		<TextField
			fullWidth
			id={schema['$id'] || null}
			value={typeof value === 'undefined' ? '' : value}
			onChange={(event) => onChange(event.target.value)}
			{...props}
		/>
	);
};

export default input;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
export const inputSetting = {
	text: '输入框',
	name: 'input',
	schema: {
		title: '输入框',
		type: 'string',
		widget: 'input',
		required: true,
	},
	setting: {
		required: {
			title: '必填',
			type: 'boolean',
		},
		disabled: {
			title: '是否禁用',
			type: 'boolean',
			default: false,
		},
		html5type: {
			title: 'html5 type',
			type: 'any',
			enum: ['text', 'email', 'number', 'password', 'search', 'url'],
			enumNames: ['text', 'email', 'number', 'password', 'search', 'url'],
			default: 'text',
		},
		size: {
			title: '尺寸',
			type: 'any',
			widget: 'select',
			enum: ['medium', 'small'],
			enumNames: ['medium', 'small'],
			default: 'small',
		},
		variant: {
			title: 'Variant',
			type: 'any',
			label: 'variant',
			enum: ['standard', 'filled', 'outlined'],
			enumNames: ['standard', 'filled', 'outlined'],
			default: 'standard',
		},
		default: {
			title: '默认值',
			type: 'string',
			default: '',
		},
		multiline: {
			title: '是否多行',
			type: 'boolean',
			default: 'false',
		},
		maxRows: {
			title: '最大行数',
			type: 'string',
			default: '5',
		},
		minRows: {
			title: '最小行数',
			type: 'string',
			default: '1',
		},
		helperText: {
			title: '提示',
			type: 'string',
		},
		placeholder: {
			title: '占位符',
			type: 'string',
		},
		startAdornment: {
			title: '开始装饰',
			type: 'string',
			default: '',
		},
		endAdornment: {
			title: '结束装饰',
			type: 'string',
			default: '',
		},
		color: {
			title: '颜色',
			type: 'string',
			enum: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
			enumNames: [
				'primary',
				'secondary',
				'error',
				'info',
				'success',
				'warning',
			],
			default: 'primary',
		},
		width: {
			title: '元素宽度',
			type: 'string',
			placeholder: 'eg 50%',
		},
	},
};
