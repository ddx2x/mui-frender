import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import React, { useEffect, useState } from 'react';
import { IPv6Input } from './ip';

export default function ipv6({ schema, addons, onChange }) {
	const [value, setValue] = useState(':::::::');

	useEffect(() => {
		if (addons) {
			setValue(addons.getValue(addons.dataPath) || ':::::::');
		}
	}, [addons]);

	function handleChange(value) {
		setValue(value);
		onChange(value);
	}

	return (
		<FormControl component='fieldset' variant='standard'>
			<IPv6Input value={value} onChange={handleChange} />
			<FormHelperText>{schema.helperText || ''}</FormHelperText>
		</FormControl>
	);
}

export const ipv6Setting = {
	text: 'ipv6',
	name: 'ipv6',
	schema: {
		title: 'ipv6',
		type: 'any',
		widget: 'ipv6',
	},
	setting: {
		default: {
			title: '默认值',
			type: 'string',
			default: '2001:db8:2de:0:0:0:0:e13',
		},
		required: {
			title: '必填',
			type: 'boolean',
		},
	},
};
