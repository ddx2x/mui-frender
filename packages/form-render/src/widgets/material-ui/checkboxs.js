import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import { getArray } from '../../utils';

const checkboxes = ({ schema, value, onChange, options: _options }) => {
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

	const handleChange = (event) => {
		let list = [...options];
		let news = [];
		const index = list.findIndex((obj) => obj.label === event.target.name);
		if (list[index]) {
			const itemValue = list[index].value;
			if (_value.includes(itemValue)) {
				news = _value.filter((item) => item !== itemValue);
			} else {
				news = [..._value, itemValue];
			}
		}
		onChange(news);
	};

	return (
		<FormControl component='fieldset' variant='standard'>
			<FormGroup row>
				{options &&
					options.map((item) => (
						<FormControlLabel
							key={item.label}
							control={
								<Checkbox
									checked={_value.includes(item.value)}
									onChange={handleChange}
									name={item.label}
								/>
							}
							label={item.label}
						/>
					))}
			</FormGroup>
			<FormHelperText>{schema.helperText || ''}</FormHelperText>
		</FormControl>
	);
};

export default checkboxes;

export const checkboxsSetting = {
	text: '点击多选',
	name: 'checkboxs',
	schema: {
		title: '点击多选',
		type: 'array',
		widget: 'checkboxs',
		required: true,
		enum: ['a', 'b', 'c'],
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
		variant: {
			title: 'variant',
			type: 'string',
			enum: ['standard', 'filled', 'outlined'],
			enumNames: ['standard', 'filled', 'outlined'],
			default: 'standard',
		},
		size: {
			title: '尺寸',
			type: 'any',
			widget: 'select',
			enum: ['medium', 'small'],
			enumNames: ['medium', 'small'],
			default: 'small',
		},
		helperText: {
			title: '提示',
			type: 'string',
		},
		type: {
			title: '类型',
			type: 'string',
		},
		required: {
			title: '必填',
			type: 'boolean',
		},
		width: {
			title: '元素宽度',
			type: 'string',
			placeholder: 'eg 50%',
		},
	},
};
