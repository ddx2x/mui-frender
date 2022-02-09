/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Core from '../../index';
import Button from '@mui/material/Button';
import Popconfirm from '../../popper';
import { DataGrid } from '@mui/x-data-grid';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';

import { useVT } from 'virtualizedtableforantd4';

const FIELD_LENGTH = 170;

// TODO: Not Done
const VirtualList = ({
  displayList = [],
  dataIndex,
  children,
  deleteItem,
  addItem,
  moveItemUp,
  moveItemDown,
  flatten,
  schema,
  listData,
  changeList,
}) => {
  const { props = {}, itemProps = {} } = schema;
  const { scrollY = 600, ...rest } = props;

  const [vt, set_components] = useVT(() => ({ scroll: { y: scrollY } }), []);

  const dataSource = displayList.map((item, idx) => {
    return { index: idx };
  });

  const columns = children.map(child => {
    const item = flatten[child];
    const schema = (item && item.schema) || {};
    return {
      dataIndex: child,
      width: FIELD_LENGTH,
      title: schema.required ? (
        <>
          <span className="fr-label-required"> *</span>
          <span>{schema.title}</span>
        </>
      ) : (
        schema.title
      ),
      render: (value, record, index) => {
        // Check: record.index 似乎是antd自己会给的，不错哦
        const childIndex = [...dataIndex, record.index];
        return (
          <Core
            hideTitle={true}
            displayType="inline"
            key={index.toString()}
            id={child}
            dataIndex={childIndex}
          />
        );
      },
    };
  });

  if (!props.hideDelete || Array.isArray(itemProps.buttons)) {
    columns.push({
      title: '操作',
      key: '$action',
      fixed: 'right',
      width: 120,
      render: (value, record, idx) => {
        return (
					<div style={{ display: 'flex' }}>
						{!props.hideDelete && (
							<Popconfirm
								title='确定删除?'
								onConfirm={() => deleteItem(idx)}
								okText='确定'
								cancelText='取消'>
								<DeleteOutlineIcon fontSize='inherit' />
							</Popconfirm>
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
						{Array.isArray(itemProps.buttons)
							? itemProps.buttons.map((item, idx) => {
									const { callback, text, html } = item;
									let onClick = () => {};
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
											style={{ marginLeft: 8 }}
											size='small'
											onClick={onClick}>
											<span
												dangerouslySetInnerHTML={{ __html: html || text }}
											/>
										</Button>
									);
							  })
							: null}
					</div>
				);
      },
    });
  }

  return (
		<>
			<div className='w-100 mb2 tr'>
				{!props.hideAdd && (
					<Button type='primary' size='small' onClick={addItem}>
						新增
					</Button>
				)}
				{Array.isArray(props.buttons)
					? props.buttons.map((item, idx) => {
							const { callback, text, html } = item;

							let onClick = () => {};
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
									style={{ marginLeft: 8 }}
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

export default VirtualList;
