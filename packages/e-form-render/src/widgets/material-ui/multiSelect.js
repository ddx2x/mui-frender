import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getArray } from '../../utils';

const multiSelect = ({ schema, value, onChange, options: _options }) => {
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

	const _value = Array.isArray(value) ? value : [];

	const textFieldProps = {
		required: schema.required || false,
		label: schema.title || 'label',
		variant: schema.variant || 'standard',
		color: schema.color || 'primary',
		helperText: schema.helperText || '',
		placeholder: schema.placeholder || '',
	};

	const autoCompleteprops = {
		options: options,
		size: schema.size || 'small',
		fullWidth: schema.fullWidth || true,
		disabled: schema.disabled || false,
	};

	const autoCompleteValue = () => {
		let _ = [];
		options.forEach((item) => {
			if (_value.indexOf(item.value) !== -1) {
				_.push(item);
			}
		});
		return _;
	};

	return (
		<Autocomplete
			multiple
			value={autoCompleteValue()}
			onChange={(event, value) => {
				onChange(value.map((item) => item.value) || []);
			}}
			renderInput={(params) => <TextField {...params} {...textFieldProps} />}
			{...autoCompleteprops}
		/>
	);
};

export default multiSelect;

export const multiSelectSetting = {
	text: '下拉多选',
	name: 'multiSelect',
	schema: {
		title: '下拉多选',
		type: 'array',
		widget: 'multiSelect',
		required: true,
		enum: ['a', 'b', 'c'],
		enumNames: ['早', '中', '晚'],
	},
	setting: {
		required: {
			title: '必填',
			type: 'boolean',
		},
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
						props: {},
						placeholder: 'key',
					},
					label: {
						title: 'label',
						type: 'string',
						className: 'frg-options-input',
						props: {},
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
			default: 'primary',
		},
		width: {
			title: '元素宽度',
			type: 'string',
			placeholder: 'eg 50%',
		},
	},
};
