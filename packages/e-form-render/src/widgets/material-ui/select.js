//x-render.gitee.io/form-render/advanced/list-display
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getArray } from '../../utils';

const select = ({ schema, value, onChange, options: _options }) => {
	let options;
	// 如果已经有外部注入的options了，内部的schema就会被忽略
	if (_options && Array.isArray(_options)) {
		options = _options;
	} else {
		const { enum: enums, enumNames } = schema || {};
		options = getArray(enums).map((item, idx) => {
			let label = enumNames && Array.isArray(enumNames) ? enumNames[idx] : item;
			const isHtml = typeof label === 'string' && label[0] === '<';
			if (isHtml) {
				label = <span dangerouslySetInnerHTML={{ __html: label }} />;
			}
			return { label, value: item };
		});
	}

	const textFieldProps = {
		required: schema.required || false,
		label: schema.title || 'label',
		variant: schema.variant || 'standard',
		helperText: schema.helperText || '',
		color: schema.color || 'primary',
		type: schema.html5type || 'text',
	};

	const autoCompleteprops = {
		options: options,
		size: schema.size || 'small',
		fullWidth: schema.fullWidth || true,
		disabled: schema.disabled || false,
	};

	const autoCompleteValue = () => {
		const filters = options.filter((item) => item.value == value);
		return filters.length > 0 ? filters[0] : null;
	};

	console.log('_options', _options);

	return (
		<Autocomplete
			value={autoCompleteValue()}
			onChange={(event, value) => onChange(value?.value || null)}
			renderInput={(params) => <TextField {...params} {...textFieldProps} />}
			{...autoCompleteprops}
		/>
	);
};

export default select;

export const selectSetting = {
	text: '下拉单选',
	name: 'select',
	schema: {
		title: '下拉单选',
		type: 'string',
		widget: 'select',
		required: true,
		enum: ['0', '1', '2'],
		enumNames: ['早', '中', '晚'],
	},
	setting: {
		enumList: {
			title: '',
			type: 'array',
			widget: 'list1',
			className: 'frg-options-list',
			items: {
				type: 'object',
				properties: {
					value: {
						title: 'key',
						type: 'string',
						className: 'frg-options-input',
						placeholder: 'key',
					},
					label: {
						title: 'label',
						type: 'string',
						className: 'frg-options-input',
						placeholder: 'label',
					},
				},
			},
			props: {
				hideMove: true,
				hideCopy: true,
			},
		},
		required: {
			title: '必填',
			type: 'boolean',
		},
		disabled: {
			title: '是否禁用',
			type: 'boolean',
			default: false,
		},
		size: {
			title: '尺寸',
			type: 'any',
			widget: 'select',
			enum: ['medium', 'small', 'large'],
			enumNames: ['medium', 'small', 'large'],
			default: 'small',
		},
		default: {
			title: '默认值',
			type: 'string',
			default: '',
		},
		variant: {
			title: 'Variant',
			type: 'any',
			label: 'variant',
			enum: ['standard', 'filled', 'outlined'],
			enumNames: ['standard', 'filled', 'outlined'],
			default: 'standard',
		},
		helperText: {
			title: '提示',
			type: 'string',
		},
		placeholder: {
			title: '占位符',
			type: 'string',
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
			default: 'info',
		},
		fullWidth: {
			title: '全尺寸',
			type: 'boolean',
			default: true,
		},
		width: {
			title: '元素宽度',
			type: 'string',
			placeholder: 'eg 50%',
		},
	},
};
