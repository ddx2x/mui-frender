import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import Core from '../../index';
import Popconfirm from '../../popper';

const SimpleList = ({
	schema,
	displayList = [],
	listData,
	changeList,
	deleteItem,
	addItem,
	copyItem,
	moveItemUp,
	moveItemDown,
	getFieldsProps,
}) => {
	const { props = {}, itemProps } = schema;

	let addBtnProps = {
		type: 'dashed',
		children: '新增一条',
	};

	if (props.addBtnProps && typeof props.addBtnProps === 'object') {
		addBtnProps = { ...addBtnProps, ...props.addBtnProps };
	}

	return (
		<div className='fr-list-1'>
			{displayList.map((item, idx) => {
				const fieldsProps = getFieldsProps(idx);
				fieldsProps.displayType = 'inline';
				if (props.hideTitle) {
					fieldsProps.hideTitle = true;
				}
				return (
					<div key={idx} style={{ display: 'flex' }}>
						<Core {...fieldsProps} />
						<div style={{ marginTop: 20, marginLeft: 5, display: 'flex' }}>
							{!props.hideDelete && (
								<div>
									<Popconfirm
										title='确定删除?'
										onConfirm={() => deleteItem(idx)}
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
										onClick={() => moveItemUp(idx)}>
										<ArrowUpwardIcon fontSize='inherit' />
									</IconButton>
									<IconButton
										size='small'
										color='primary'
										onClick={() => moveItemDown(idx)}>
										<ArrowDownwardIcon fontSize='inherit' />
									</IconButton>
								</div>
							)}
							{!props.hideAdd && !props.hideCopy && (
								<div>
									<IconButton
										size='small'
										color='primary'
										onClick={() => copyItem(idx)}>
										<ContentCopyIcon fontSize='inherit' />
									</IconButton>
								</div>
							)}
						</div>
					</div>
				);
			})}
			<div style={{ marginTop: displayList.length > 0 ? 0 : 8 }}>
				{!props.hideAdd && <Button onClick={addItem} {...addBtnProps} />}
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
									style={{ marginLeft: 8 }}
									type='dashed'
									onClick={onClick}>
									<span dangerouslySetInnerHTML={{ __html: html || text }} />
								</Button>
							);
					  })
					: null}
			</div>
		</div>
	);
};

export default SimpleList;
