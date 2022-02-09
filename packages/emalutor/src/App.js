import FormRender, { useForm } from '@lz/e-form-render';
import Generator from '@lz/fr-generator';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import React, { useRef, useState } from 'react';
import './App.css';
import { commonSettings, concatD, widgets } from './settings';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// const defaultValue = {
// 	type: 'object',
// 	properties: {
// 		select_j8jTWl: {
// 			title: '下拉单选',
// 			type: 'string',
// 			widget: 'select',
// 			required: true,
// 			enum: ['0', '1', '2'],
// 			enumNames: ['早', '中', '晚'],
// 		},
// 		'multiSelect_0PXfC-': {
// 			title: '下拉多选',
// 			type: 'array',
// 			widget: 'multiSelect',
// 			enum: ['a', 'b', 'c'],
// 			enumNames: ['早', '中', '晚'],
// 			disabled: false,
// 			size: 'small',
// 			variant: 'standard',
// 			color: 'primary',
// 			required: true,
// 		},
// 		radio_LcdIhf: {
// 			title: '单选',
// 			type: 'string',
// 			widget: 'radio',
// 			required: true,
// 			enum: ['a', 'b', 'c'],
// 			enumNames: ['早', '中', '晚'],
// 			size: 'small',
// 		},
// 		switchWidget_VmP6Ln: {
// 			title: '是否选择',
// 			type: 'boolean',
// 			widget: 'switchWidget',
// 			required: true,
// 			size: 'small',
// 			labelPlacement: 'start',
// 			default: true,
// 		},
// 		boolean_OPMJ_S: {
// 			title: '是否选中',
// 			type: 'boolean',
// 			widget: 'checkbox',
// 			default: true,
// 		},
// 		checkboxs_Yrwu_l: {
// 			title: '点击多选',
// 			type: 'array',
// 			widget: 'checkboxs',
// 			required: true,
// 			enum: ['a', 'b', 'c'],
// 			enumNames: ['早', '中', '晚'],
// 			variant: 'standard',
// 			size: 'small',
// 		},
// 		input_Qb_jL2: {
// 			title: '输入框',
// 			type: 'string',
// 			widget: 'input',
// 			required: true,
// 			disabled: false,
// 			html5type: 'text',
// 			size: 'small',
// 			variant: 'standard',
// 			default: '',
// 			multiline: 'false',
// 			maxRows: '5',
// 			minRows: '1',
// 			startAdornment: '',
// 			endAdornment: '',
// 			color: 'primary',
// 		},
// 	},
// 	labelWidth: 120,
// 	displayType: 'row',
// };

const defaultValue = {
	type: 'object',
	labelWidth: 120,
	displayType: 'row',
	properties: {
		object_HJzQFV: {
			title: '对象',
			type: 'object',
			// container: 'card',
			// layout: 'vertical',
			// column: '1',
			properties: {
				input_KwXipW: {
					title: '输入框',
					type: 'string',
					widget: 'input',
					disabled: false,
					html5type: 'text',
					helperText: '这是一个提示',
					color: 'primary',
					required: true,
					default: '',
				},
			},
		},
		selectTable_MTyNPR: {
			title: '选项表格',
			type: 'array',
			widget: 'selectTable',
			idProperty: 'id',
			defaultLimit: 5,
			singleChoice: true,
			minHeight: 400,
			rows: [
				{
					id: 1,
					name: 'John McQueen',
					age: 35,
				},
				{
					id: 2,
					name: 'Mary Stones',
					age: 25,
				},
				{
					id: 3,
					name: 'Robert Fil',
					age: 27,
				},
				{
					id: 4,
					name: 'Roger Robson',
					age: 81,
				},
				{
					id: 5,
					name: 'Billary Konwik',
					age: 18,
				},
				{
					id: 6,
					name: 'Bob Martin',
					age: 18,
				},
				{
					id: 7,
					name: 'Matthew Richardson',
					age: 54,
				},
				{
					id: 8,
					name: 'Ritchie Peterson',
					age: 54,
				},
				{
					id: 9,
					name: 'Bryan Martin',
					age: 40,
				},
				{
					id: 10,
					name: 'Mark Martin',
					age: 44,
				},
				{
					id: 11,
					name: 'Michelle Sebastian',
					age: 24,
				},
				{
					id: 12,
					name: 'Michelle Sullivan',
					age: 61,
				},
				{
					id: 13,
					name: 'Jordan Bike',
					age: 16,
				},
				{
					id: 14,
					name: 'Nelson Ford',
					age: 34,
				},
				{
					id: 15,
					name: 'Tim Cheap',
					age: 3,
				},
				{
					id: 16,
					name: 'Robert Carlson',
					age: 31,
				},
				{
					id: 17,
					name: 'Johny Perterson',
					age: 40,
				},
			],
			columns: [
				{
					field: 'name',
					headerName: 'Name',
				},
				{
					field: 'age',
					headerName: 'Age',
				},
			],
		},
		'any_yk6-ER': {
			title: '穿梭框',
			type: 'any',
			widget: 'transfer',
			default: {
				left: ['1', '2', '3', '4'],
				right: ['5', '6', '7', '8'],
			},
			required: true,
			leftName: '选择',
			rightName: '选中',
			listWidth: 300,
			listHeight: 400,
		},
		'any_f-Yr_6': {
			title: '树',
			type: 'any',
			widget: 'tree',
			treeData: [
				{
					key: '0-0',
					title: 'parent 1',
					children: [
						{
							key: '0-0-0',
							title: 'parent 1-1',
							children: [
								{
									key: '0-0-0-0',
									title: 'parent 1-1-0',
									children: [
										{
											key: '0-0-0-0-0',
											title: 'parent 1-1-0-1',
										},
										{
											key: '0-0-0-0-1',
											title: 'parent 1-1-0-2',
										},
									],
								},
							],
						},
						{
							key: '0-0-1',
							title: 'parent 1-2',
							children: [
								{
									key: '0-0-1-0',
									title: 'parent 1-2-0',
								},
								{
									key: '0-0-1-1',
									title: 'parent 1-2-1',
								},
								{
									key: '0-0-1-2',
									title: 'parent 1-2-2',
								},
								{
									key: '0-0-1-3',
									title: 'parent 1-2-3',
								},
								{
									key: '0-0-1-4',
									title: 'parent 1-2-4',
								},
								{
									key: '0-0-1-5',
									title: 'parent 1-2-5',
								},
								{
									key: '0-0-1-6',
									title: 'parent 1-2-6',
								},
								{
									key: '0-0-1-7',
									title: 'parent 1-2-7',
								},
								{
									key: '0-0-1-8',
									title: 'parent 1-2-8',
								},
								{
									key: '0-0-1-9',
									title: 'parent 1-2-9',
								},
							],
						},
					],
				},
			],
			default: ['0-0-1-0', '0-0-1-1'],
			required: true,
			debug: true,
		},
		'boolean_-wb-Eo': {
			title: '是否选中',
			type: 'boolean',
			widget: 'checkbox',
			helperText: '这是一个提示',
			default: true,
			required: true,
		},
		input_Cr5iPK: {
			title: '输入框',
			type: 'string',
			widget: 'input',
			disabled: false,
			html5type: 'text',
			size: 'small',
			helperText: '这是一个提示',
			required: true,
			multiline: false,
		},
		multiSelect_4OVCh0: {
			title: '下拉多选',
			type: 'array',
			widget: 'multiSelect',
			enum: ['a', 'b', 'c'],
			enumNames: ['早', '中', '晚'],
			helperText: '这是一个提示',
			size: 'small',
			required: true,
		},
		any_c4vjYL: {
			title: '下拉单选',
			type: 'string',
			widget: 'select',
			enum: ['0', '1', '2'],
			enumNames: ['早', '中', '晚'],
			helperText: '这是一个提示',
			required: true,
			size: 'small',
			color: 'info',
			fullWidth: true,
		},
		checkboxs_KXkCLE: {
			title: '点击多选',
			type: 'string',
			widget: 'checkboxs',
			enum: ['a', 'b', 'c'],
			enumNames: ['早', '中', '晚'],
			helperText: '这是一个提示',
			size: 'small',
			required: true,
		},
		switchWidget_cWUKok: {
			title: '是否选择',
			type: 'boolean',
			widget: 'switchWidget',
			size: 'small',
			labelPlacement: 'start',
			default: true,
			required: true,
			helperText: '这是一个提示',
		},
		list_2tclGj: {
			title: '数组',
			type: 'array',
			items: {
				type: 'object',
				properties: {
					input_ILiJH7: {
						title: '输入框',
						type: 'string',
						widget: 'input',
						disabled: false,
						html5type: 'text',
						size: 'small',
						startAdornment: '',
						endAdornment: '',
						color: 'primary',
						required: true,
					},
					input_aRSKwg: {
						title: '输入框',
						type: 'string',
						widget: 'input',
						disabled: false,
						html5type: 'text',
						size: 'small',
						maxRows: '5',
						minRows: '2',
						startAdornment: '',
						endAdornment: '',
						color: 'primary',
						required: true,
					},
				},
			},
			props: {},
		},
		tableList_Le8UVB: {
			title: '数组',
			type: 'array',
			// widget: 'drawerList',
			items: {
				type: 'object',
				properties: {
					input_cbh3W0: {
						title: '输入框',
						type: 'string',
						widget: 'input',
						disabled: false,
						html5type: 'text',
						size: 'small',
						maxRows: '5',
						minRows: '2',
						startAdornment: '',
						endAdornment: '',
						color: 'primary',
						required: true,
					},
					'input_l1B-uD': {
						title: '输入框',
						type: 'string',
						widget: 'input',
						disabled: false,
						html5type: 'text',
						size: 'small',
						maxRows: '5',
						minRows: '2',
						startAdornment: '',
						endAdornment: '',
						color: 'primary',
						required: true,
					},
				},
			},
			props: {},
		},
		simpleList_H2k6XR: {
			title: '数组',
			type: 'array',
			widget: 'simpleList',
			items: {
				type: 'object',
				properties: {
					'input_-pVVM7': {
						title: '输入框',
						type: 'string',
						widget: 'input',
						required: true,
					},
					input_gnhjFI: {
						title: '输入框',
						type: 'string',
						widget: 'input',
						required: true,
					},
				},
			},
			props: {},
		},
		radio_hDas1B: {
			title: '单选',
			type: 'string',
			widget: 'radio',
			enum: ['a', 'b', 'c'],
			enumNames: ['早', '中', '晚'],
			helperText: '这是一个提示',
			size: 'small',
			required: true,
		},
	},
};

// const defaultValue = {
// 	type: 'object',
// 	properties: {
// 		selectTable_wAfLIh: {
// 			title: '选项表格',
// 			type: 'any',
// 			widget: 'selectTable',
// 			idProperty: 'id',
// 			defaultLimit: 5,
// 			singleChoice: true,
// 			minHeight: 400,
// 			default: { 1: { id: 1, name: 'John McQueen', age: 35 } },
// 		},
// 	},
// 	labelWidth: 120,
// 	displayType: 'row',
// };

// const defaultValue = {
// 	type: 'object',
// 	properties: {
// 		input1: {
// 			title: '简单输入框',
// 			type: 'string',
// 			required: true,
// 			rules: [
// 				{
// 					pattern: '^[A-Za-z0-9]+$',
// 					message: '只允许填写英文字母和数字',
// 				},
// 			],
// 		},
// 		select1: {
// 			title: '单选',
// 			type: 'string',
// 			required: true,
// 			enum: ['a', 'b', 'c'],
// 			enumNames: ['早', '中', '晚'],
// 		},
// 		object_RDKogW: {
// 			title: '对象',
// 			type: 'object',
// 			properties: {
// 				input_07PRZK: {
// 					title: '输入框',
// 					type: 'string',
// 					widget: 'input',
// 					html5type: 'text',
// 					default: '',
// 					disabled: false,
// 					maxRows: '5',
// 					minRows: '2',
// 					size: 'small',
// 					label: '标签',
// 					color: 'primary',
// 					required: true,
// 				},
// 			},
// 		},
// 	},
// 	labelWidth: 120,
// 	displayType: 'row',
// };

// const defaultValue = {
// 	type: 'object',
// 	labelWidth: 100,
// 	displayType: 'row',
// 	properties: {
// 		select_tmsa3A: {
// 			title: '单选',
// 			type: 'any',
// 			enum: [0, 1, 2],
// 			widget: 'select',
// 			enumNames: ['早', '中', '晚'],
// 			default: 0,
// 		},
// 		collector_BwnTVg: {
// 			title: '元素数组',
// 			type: 'any',
// 			widget: 'collector',
// 			component: 'input',
// 			default: [0, 1, 2],
// 		},
// 		'radio_6uN-BW': {
// 			title: '单选',
// 			type: 'any',
// 			widget: 'radio',
// 			enum: [0, 1, 2],
// 			enumNames: ['早', '中', '晚'],
// 			size: 'small',
// 			default: 0,
// 		},
// 		boolean_mz1OjP: {
// 			title: '是否选中',
// 			type: 'boolean',
// 			widget: 'checkbox',
// 		},
// 		any_8gDpP9: {
// 			title: '下拉单选',
// 			type: 'any',
// 			widget: 'select',
// 			enum: [0, 1, 2],
// 			enumNames: ['早', '中', '晚'],
// 			size: 'small',
// 			default: '',
// 			required: true,
// 		},
// 		checkboxs_BPTud4: {
// 			title: '点击多选',
// 			type: 'any',
// 			widget: 'checkboxs',
// 			enum: [0, 1, 2],
// 			enumNames: ['早', '中', '晚'],
// 			size: 'small',
// 		},
// 		multiSelect_uNqw62: {
// 			title: '下拉多选',
// 			type: 'any',
// 			widget: 'multiSelect',
// 			enum: [0, 1, 2],
// 			enumNames: ['早', '中', '晚'],
// 			size: 'small',
// 		},
// 	},
// };

function App() {
	const [openfr, setOpenFR] = useState(false);
	const [schema, setSchema] = useState(defaultValue);
	const form = useForm();
	const genRef = useRef();

	const onFinish = (formData, errors) => {
		const fd = JSON.stringify(formData, null, 2);
		alert(fd);
		console.log('formData:', fd, 'errors', errors);
	};

	return (
		<div className='App'>
			<Generator
				commonSettings={commonSettings}
				widgets={widgets}
				defaultValue={defaultValue}
				settings={concatD}
				ref={genRef}
				onChange={(data) => {
					const schema = genRef.current && genRef.current.getValue();
					setSchema(schema);
				}}
				extraButtons={[
					false,
					true,
					true,
					true,
					{
						text: '展示',
						onClick: () => {
							setOpenFR(true);
						},
					},
				]}
			/>
			<Modal
				title='展示'
				visible={openfr}
				width={1000}
				onCancel={() => {
					setOpenFR(false);
				}}
				onOk={() => {
					form.submit();
				}}>
				<FormRender schema={schema} form={form} onFinish={onFinish} onMount />
			</Modal>
		</div>
	);
}

export default App;
