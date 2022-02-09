import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { getArray } from '../../utils';

const radio = ({ schema, value, onChange, options: _options }) => {
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

	return (
		<FormControl component='fieldset' variant='standard'>
			<RadioGroup
				row
				value={value}
				onChange={(event) => onChange(event.target.value)}>
				{options &&
					options.map((item, index) => {
						if (item.label !== undefined && item.value !== undefined) {
							return (
								<FormControlLabel
									key={index.toString()}
									control={<Radio />}
									value={item.value}
									label={item.label}
								/>
							);
						}
					})}
			</RadioGroup>
			<FormHelperText>{schema.helperText || ''}</FormHelperText>
		</FormControl>
	);
};

export default radio;

export const radioSetting = {
	text: '点击单选',
	name: 'radio',
	schema: {
		title: '单选',
		type: 'string',
		widget: 'radio',
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
		size: {
			title: '尺寸',
			type: 'any',
			widget: 'select',
			enum: ['medium', 'small'],
			enumNames: ['medium', 'small'],
			default: 'small',
		},
		required: {
			title: '必填',
			type: 'boolean',
		},
		default: {
			title: '默认值',
			type: 'string',
		},
		helperText: {
			title: '提示',
			type: 'string',
		},
		width: {
			title: '元素宽度',
			type: 'string',
			placeholder: 'eg 50%',
		},
	},
};
