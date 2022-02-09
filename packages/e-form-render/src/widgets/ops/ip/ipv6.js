import Input from '@mui/material/Input';
import React, { useEffect, useState } from 'react';
import { getRange, isValidIPv6ItemValue } from './helper';
import './style.css';

const ipv6Division = ':';
const ipv6omitDivision = '::';

function splits(value, paste = false) {
	let list = value.split(ipv6omitDivision);

	// :: 只有一组时 ipv6 为省略缩写
	if (list.length < 3) {
		paste = true;
	}

	let start = list[0] ? list[0].split(ipv6Division) : [];
	let end = list[1] ? list[1].split(ipv6Division) : [];
	if (start.length == 8) {
		return start;
	}
	let omitNum = 8 - (start.length + end.length);
	for (let i = 0; i < omitNum; i++) {
		start.push(paste ? '0' : '');
	}
	return start.concat(end);
}

export function IPv6Input(props) {
	const refs = [];
	const [value, setValue] = useState([]);

	useEffect(() => {
		let list = [];
		if (!Array.isArray(props.value)) {
			list = splits(props.value);
		}
		setValue(list);
	}, [props.value]);

	/**
	 * Change Event
	 */
	function handleChange(e, i) {
		let val = e.target.value;
		if (val !== '' && !isValidIPv6ItemValue(val)) {
			return e.preventDefault();
		}

		let list = value;
		list[i] = val;
		setValue(list);
		onPropsChange();

		if (String(val).length === 4 && i < 7) {
			refs[`_input-${i + 1}`].focus();
		}
	}

	/**
	 * Keydown Event
	 */
	function handleKeyDown(e, i) {
		/* 37 = ←, 39 = →, 8 = backspace, 190 = . */
		let domId = i;
		if (
			(e.keyCode === 37 || e.keyCode === 8) &&
			getRange(e.target).end === 0 &&
			i > 0
		) {
			domId = i - 1;
		}
		if (
			e.keyCode === 39 &&
			getRange(e.target).end === e.target.value.length &&
			i < 3
		) {
			domId = i + 1;
		}
		if (e.keyCode === 190) {
			e.preventDefault();
			if (i < 3) {
				domId = i + 1;
			}
		}
		refs[`_input-${domId}`].focus();
	}

	/**
	 * Paste Event
	 */
	function handlePaste(e, i) {
		if (!e.clipboardData || !e.clipboardData.getData) {
			return;
		}
		const pasteData = e.clipboardData.getData('text/plain');
		if (!pasteData) {
			return;
		}
		let list = splits(pasteData, true);
		if (!list.every(isValidIPv6ItemValue)) {
			return;
		}

		let oldValue = value;
		list.forEach((val, j) => {
			oldValue[i + j] = val;
		});
		setValue(oldValue);
		onPropsChange();

		return e.preventDefault();
	}

	/**
	 * call change props
	 */
	function onPropsChange() {
		let ip = value.map((val) => val).join(ipv6Division);
		return props.onChange(ip);
	}

	const className = ['react-ip-input', props.className].join(' ');

	return (
		<div className={className}>
			{value.map((val, index) => (
				<div className='react-ip-input__item' key={index}>
					<Input
						key={`inpv6-${index}`}
						inputRef={(el) => (refs[`_input-${index}`] = el)}
						type='text'
						value={val}
						onChange={(e) => handleChange(e, index)}
						onKeyDown={(e) => handleKeyDown(e, index)}
						onPaste={(e) => handlePaste(e, index)}
					/>
					{index < 7 ? <>:</> : false}
				</div>
			))}
		</div>
	);
}
