/* eslint-disable jsx-a11y/anchor-is-valid */
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
// #Mui 更换mui
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import React, { useRef } from 'react';
import { useSet } from '../../../hooks';
import { getDataPath, getDisplayValue, getKeyFromPath } from '../../../utils';
import Core from '../../index';
import Popconfirm from '../../popper';
import ErrorMessage from '../../RenderField/ErrorMessage';

const FIELD_LENGTH = 170;

const DrawerList = ({
	displayList = [],
	dataPath,
	children,
	deleteItem,
	addItem,
	moveItemDown,
	moveItemUp,
	flatten,
	errorFields,
	getFieldsProps,
	schema,
	changeList,
	listData,
}) => {
	const { props = {}, itemProps = {} } = schema;
	const { buttons, ...columnProps } = itemProps;
	const { pagination = {}, ...rest } = props;

	const paginationConfig = pagination && {
		size: 'small',
		hideOnSinglePage: true,
		...pagination,
	};

	const currentIndex = useRef(-1);
	const [state, setState] = useSet({
		showDrawer: false,
	});

	const { showDrawer } = state;

	const dataSource = displayList.map((item, index) => ({
		...item,
		id: index,
	}));

	const columns = children.map((child) => {
		const item = flatten[child];
		const schema = (item && item.schema) || {};
		const _dataIndex = getKeyFromPath(child);
		return {
			id: _dataIndex,
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
				const childPath = getDataPath(child, [params.id]);
				const errorObj =
					errorFields.find((item) => item.name == childPath) || {};
				//TODO: 万一error在更深的层，这个办法是find不到的，会展示那一行没有提示。可以整一行加一个红线的方式处理
				return (
					<div>
						<div>{getDisplayValue(params.value, schema)}</div>
						{errorObj.error && (
							<ErrorMessage message={errorObj.error} schema={schema} />
						)}
					</div>
				);
			},
			...columnProps,
		};
	});

	columns.push({
		field: '$action',
		headerName: '操作',
		isEditable: false,
		filterable: false,
		sortable: false,
		position: 'right',
		// width: FIELD_LENGTH - 35,
		flex: 1,
		align: 'center',
		headerAlign: 'center',
		renderCell: (params) => {
			const index = (params.value && params.id) || 0;
			return (
				<div style={{ display: 'flex' }}>
					<div>
						<IconButton
							size='small'
							color='primary'
							onClick={() => openDrawer(index)}>
							<EditIcon fontSize='inherit' />
						</IconButton>
					</div>
					{!props.hideDelete && (
						<div>
							<Popconfirm
								title='确定删除?'
								onConfirm={() => deleteItem(index)}
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
				</div>
			);
		},
	});

	const fieldsProps = getFieldsProps(currentIndex.current);

	const openDrawer = (index) => {
		currentIndex.current = index;
		setState({
			showDrawer: true,
		});
	};

	const closeDrawer = () => {
		currentIndex.current = -1;
		setState({
			showDrawer: false,
		});
	};

	const handleAdd = () => {
		const newIndex = addItem();
		openDrawer(newIndex);
	};

	return (
		<>
			<div className='w-100 mb2 tr'>
				{!props.hideAdd && (
					<Button
						type='primary'
						color='primary'
						size='small'
						onClick={handleAdd}>
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
			<Drawer onClose={closeDrawer} open={showDrawer}>
				<AppBar position='static'>
					<Toolbar variant='dense'>
						<Typography
							variant='subtitle1'
							component='div'
							sx={{ flexGrow: 1 }}>
							编辑
						</Typography>
						<IconButton size='small' sx={{ color: 'white'}} onClick={closeDrawer}>
							<CloseIcon fontSize='inherit' />
						</IconButton>
					</Toolbar>
				</AppBar>
				<div className='fr-container' style={{ margin: 15 }}>
					<Core {...fieldsProps} />
				</div>
			</Drawer>
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

export default DrawerList;
