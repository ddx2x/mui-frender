import { TextField } from '@mui/material';
import { useState } from 'react';

export default function color({ schema, addons, onChange }) {
	const [value, setValue] = useState([]);

	function handleChange(value) {
		setValue(value);
		onChange(value);
	}

	return (
		<>
			<TextField
				sx={{ width: '5vw', marginRight: '10px' }}
				type='color'
				value={value}
				onChange={(event) => handleChange(event.target.value)}
				id={schema['$id'] || null}
				label={schema.title || 'label'}
				size={schema.size || 'small'}
				variant={schema.variant || 'outlined'}
			/>
			<TextField
				sx={{ width: '32vw' }}
				value={value}
				onChange={(event) => handleChange(event.target.value)}
				label={schema.title || 'label'}
				size={schema.size || 'small'}
				variant={schema.variant || 'outlined'}
			/>
		</>
	);
}

export const colorSetting = {
	text: '颜色选择器',
	name: 'color',
	schema: {
		title: '颜色选择器',
		type: 'any',
		widget: 'color',
	},
	setting: {},
};
