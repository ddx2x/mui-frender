import Input from '@mui/material/Input';
import React, { useEffect, useState } from 'react';
import { getRange, isValidIPItemValue } from './helper';
import './style.css';

const ipv4Division = '.';

export function IPv4Input(props) {
	const refs = [];
	const [value, setValue] = useState([]);

	useEffect(() => {
		let list = value;
		const splits = props.value.split('/');
		if (!Array.isArray(splits[0])) {
			list = splits[0].split(ipv4Division);
		}

		if (props.cidr === true) {
			list.push(splits[1] || '');
		}
		setValue(list);
	}, [props.value]);

	/**
	 * Change Event
	 */
	function handleChange(e, i) {
		let focus = false;
		let val = parseInt(e.target.value);

		if (isNaN(e.target.value)) {
			return e.preventDefault();
		}
		if (e.target.value !== '' && !isValidIPItemValue(val)) {
			val = 255;
		}

		let list = value;
		list[i] = val;
		setValue(list);
		onPropsChange();

		if (!isNaN(val) && String(val).length === 3 && i < 3) {
			focus = true;
		}
		if (
			props.cidr === true &&
			!isNaN(val) &&
			String(val).length === 3 &&
			i < 4
		) {
			focus = true;
		}

		if (focus) {
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
		let list = [];

		const splits = pasteData.split('/');
		if (!Array.isArray(splits[0])) {
			list = splits[0].split(ipv4Division);
		}
		if (props.cidr === true) {
			list.push(splits[1] || '');
		}
		if (!list.every(isValidIPItemValue)) {
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
		let ip = value
			.slice(0, 4)
			.map((val) => (isNaN(val) ? '' : val))
			.join(ipv4Division);

		if (props.cidr) {
			ip += '/' + value[4];
		}

		return props.onChange(ip);
	}

	// const ip = value
	// 	.slice(0, 4)
	// 	.map((val) => (isNaN(val) ? '' : val))
	// 	.join(ipv4Division);

	const className = [
		'react-ip-input',
		props.className,
		// props.isError(ip) ? 'has-error' : '',
	].join(' ');

	return (
		<div className={className}>
			{value.slice(0, 4).map((val, index) => (
				<div className='react-ip-input__item' key={index}>
					<Input
						key={`ipv4-${index}`}
						sx={{ minWidth: '1%' }}
						inputRef={(el) => (refs[`_input-${index}`] = el)}
						type='text'
						value={isNaN(val) ? '' : val}
						onChange={(e) => handleChange(e, index)}
						onKeyDown={(e) => handleKeyDown(e, index)}
						onPaste={(e) => handlePaste(e, index)}
					/>
					{index < 3 ? <i>{ipv4Division}</i> : false}
				</div>
			))}
			{props.cidr === true ? (
				<div className='react-ip-input__item' key={4}>
					/
					<Input
						inputRef={(el) => (refs[`_input-${4}`] = el)}
						type='text'
						value={isNaN(value[4]) ? '' : value[4]}
						onChange={(e) => handleChange(e, 4)}
						onKeyDown={(e) => handleKeyDown(e, 4)}
						onPaste={(e) => handlePaste(e, 4)}
					/>
				</div>
			) : (
				false
			)}
		</div>
	);
}
