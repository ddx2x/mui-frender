/* eslint-disable jsx-a11y/anchor-is-valid */
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import Core from '../../index';
// #Mui 更换mui
import Popconfirm from '../../popper';

const CardList = ({
	displayList = [],
	listData,
	changeList,
	schema,
	deleteItem,
	copyItem,
	addItem,
	moveItemUp,
	moveItemDown,
	displayType,
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
		<>
			<div className='fr-card-list'>
				{displayList.map((item, idx) => {
					const fieldsProps = getFieldsProps(idx);
					fieldsProps.displayType = displayType;
					return (
						<div
							className={`fr-card-item ${
								displayType === 'row' ? 'fr-card-item-row' : ''
							}`}
							key={idx}>
							<div className='fr-card-index'>{idx + 1}</div>
							<Core {...fieldsProps} />
							<div direction='horizontal' className='fr-card-toolbar'>
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
											onClick={() => moveItemUp(idx)}>
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
								{!props.hideDelete && (
									<div>
										<Popconfirm
											title='确定删除?'
											onConfirm={() => deleteItem(idx)}
											okText='确定'
											cancelText='取消'>
											<CloseIcon fontSize='inherit' />
										</Popconfirm>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
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
									type='dashed'
									variant='outlined'
									size='small'
									onClick={onClick}>
									<span dangerouslySetInnerHTML={{ __html: html || text }} />
								</Button>
							);
					  })
					: null}
			</div>
		</>
	);
};

export default CardList;
