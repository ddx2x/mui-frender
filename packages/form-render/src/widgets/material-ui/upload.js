export default function upload({ schema, value, addons, onChange }) {
	return <></>;
}

export const uploadSetting = {
	text: '输入框',
	name: 'textField',
	schema: {
		title: '输入框',
		type: 'any',
		widget: 'TextField',
	},
	setting: {
		type: {
			title: 'html5 input类型',
			type: 'string',
			enum: ['text', 'email', 'hidden', 'number', 'password', 'search', 'url'],
			enumNames: [
				'text',
				'email',
				'hidden',
				'number',
				'password',
				'search',
				'url',
			],
		},
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
		variant: {
			title: 'Variant',
			type: 'string',
			enum: ['standard', 'filled', 'outlined'],
			enumNames: ['standard', 'filled', 'outlined'],
		},
		label: {
			title: '标签',
			type: 'string',
			default: '标签',
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
