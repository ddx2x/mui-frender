/* eslint-disable jsx-a11y/anchor-is-valid */
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import Core from '../../index';
import Popconfirm from '../../popper';

const FIELD_LENGTH = 170;

const TableList = ({
	displayList = [],
	dataIndex,
	children,
	deleteItem,
	copyItem,
	addItem,
	moveItemUp,
	moveItemDown,
	flatten,
	schema,
	listData,
	changeList,
}) => {
	const { props = {}, itemProps = {} } = schema;
	const { buttons, ...columnProps } = itemProps;
	const { pagination = {}, ...rest } = props;

	const paginationConfig = pagination && {
		size: 'small',
		hideOnSinglePage: true,
		...pagination,
	};

	const dataSource = displayList.map((item, idx) => {
		return { id: idx };
	});

	const columns = children.map((child) => {
		const item = flatten[child];
		const schema = (item && item.schema) || {};
		return {
			field: child,
			headerName: schema.required ? (
				<>
					<span className='fr-label-required'> *</span>
					<span>{schema.title}</span>
				</>
			) : (
				schema.title
			),
			filterable: false,
			sortable: false,
			disableColumnMenu: false,
			// width: FIELD_LENGTH,
			flex: 1,
			align: 'center',
			headerAlign: 'center',
			renderCell: (params) => {
				const childIndex = [...dataIndex, params.id];
				return (
					<Core
						hideTitle={true}
						displayType='inline'
						key={params.id.toString()}
						id={child}
						dataIndex={childIndex}
					/>
				);
			},
			...columnProps,
		};
	});

	if (
		!props.hideDelete ||
		!props.hideAdd ||
		!props.hideCopy ||
		!props.hideMove
	) {
		columns.push({
			field: '$action',
			headerName: '操作',
			isEditable: false,
			filterable: false,
			sortable: false,
			disableColumnMenu: false,
			position: 'right',
			// width: FIELD_LENGTH - 35,
			flex: 1,
			align: 'center',
			headerAlign: 'center',
			renderCell: (params) => {
				return (
					<div style={{ display: 'flex' }}>
						{!props.hideDelete && (
							<div>
								<Popconfirm
									title='确定删除?'
									onConfirm={() => deleteItem(params.id)}
									okText='确定'
									cancelText='取消'>
									<DeleteOutlineIcon fontSize='inherit' />
								</Popconfirm>
							</div>
						)}
						{!props.hideMove && (
							<div>
								<IconButton
									size='small'
									color='primary'
									onClick={() => moveItemUp(params.id)}>
									<ArrowUpwardIcon fontSize='inherit' />
								</IconButton>
								<IconButton
									size='small'
									color='primary'
									onClick={() => moveItemDown(params.id)}>
									<ArrowDownwardIcon fontSize='inherit' />
								</IconButton>
							</div>
						)}
						{!props.hideAdd && !props.hideCopy && (
							<div>
								<IconButton
									size='small'
									color='primary'
									onClick={() => copyItem(params.id)}>
									<ContentCopyIcon fontSize='inherit' />
								</IconButton>
							</div>
						)}
					</div>
				);
			},
		});
	}

	return (
		<>
			<div className='w-100 mb2 tr'>
				{!props.hideAdd && (
					<Button type='primary' color='primary' size='small' onClick={addItem}>
						新增
					</Button>
				)}
				{Array.isArray(props.buttons)
					? props.buttons.map((item, idx) => {
							const { callback, text, html } = item;
							let onClick = () => {
								console.log({
									value: listData,
									onChange: changeList,
									schema,
								});
							};
							if (typeof window[callback] === 'function') {
								onClick = () => {
									window[callback]({
										value: listData,
										onChange: changeList,
										schema,
									});
								};
							}
							return (
								<Button
									key={idx.toString()}
									sx={{ ml: 8 }}
									size='small'
									onClick={onClick}>
									<span dangerouslySetInnerHTML={{ __html: html || text }} />
								</Button>
							);
					  })
					: null}
			</div>
			<DataGrid
				disableColumnFilter
				disableColumnMenu
				disableColumnSelector
				disableSelectionOnClick
				disableReorder
				checkboxSelectionVisibleOnly={false}
				isRowSelectable={false}
				showCellRightBorder={false}
				showColumnRightBorder={false}
				autoHeight
				rows={dataSource}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
			/>
		</>
	);
};

export default TableList;
