import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import React, { useEffect, useState } from 'react';
import { IPv4Input } from './ip';

export default function ipv4({ schema, addons, onChange }) {
	const [value, setValue] = useState('...');

	useEffect(() => {
		if (addons) {
			setValue(addons.getValue(addons.dataPath) || '...');
		}
	}, [addons]);

	function handleChange(value) {
		setValue(value);
		onChange(value);
	}

	return (
		<FormControl component='fieldset' variant='standard'>
			<IPv4Input
				cidr={schema.cidr || false}
				value={value}
				onChange={handleChange}
			/>
			<FormHelperText>{schema.helperText || ''}</FormHelperText>
		</FormControl>
	);
}

export const ipv4Setting = {
	text: 'ipv4',
	name: 'ipv4',
	schema: {
		title: 'ipv4',
		type: 'any',
		widget: 'ipv4',
	},
	setting: {
		default: {
			title: '默认值',
			type: 'string',
			default: '192.168.1.1',
		},
		cidr: {
			title: 'cidr模式',
			type: 'boolean',
			default: false,
		},
		required: {
			title: '必填',
			type: 'boolean',
		},
	},
};
