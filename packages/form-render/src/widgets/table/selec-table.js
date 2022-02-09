import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';

const selectTable = ({ schema, value, onChange }) => {

	let columns = schema.columns ? schema.columns : [];
	columns = columns.map((item) => {
		return {
			...item,
			...{
				flex: 1,
				align: 'center',
				headerAlign: 'center',
			},
		};
	});

	const rows = schema.rows ? schema.rows : [];
	const [selected, setSelected] = useState(value || []);

	const singleChoice = schema.singleChoice || false;

	const onSelectionModelChange = (model, details) => {
		if (singleChoice) {
			// 全选
			if (model.length > 2) {
				model = [];
			}
			// 单选取第二个选项
			if (model.length == 2) {
				model = [model[1]];
			}
		}
		setSelected(model);
		onChange(model);
	};

	return (
		<DataGrid
			checkboxSelection
			disableSelectionOnClick
			disableReorder
			checkboxSelectionVisibleOnly
			rows={rows}
			columns={columns}
			autoHeight
			density='compact'
			selectionModel={selected}
			onSelectionModelChange={onSelectionModelChange}
			pageSize={10}
		/>
	);
};

export default selectTable;

export const selectTableSetting = {
	text: '选项表格',
	name: 'selectTable',
	schema: {
		title: '选项表格',
		type: 'any',
		widget: 'selectTable',
	},
	setting: {
		defaultLimit: {
			title: 'defaultLimit',
			type: 'number',
			default: 5,
		},
		singleChoice: {
			title: '单选',
			type: 'boolean',
			widget: 'checkbox',
			default: true,
		},
	},
};
