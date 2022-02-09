import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useEffect, useState } from 'react';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IPv4Input, IPv6Input } from '../ops/ip';

function Item(props) {
	const {
		// 这些 props 由 React DnD注入，参考`collect`函数定义
		isDragging,
		connectDragSource,
		connectDragPreview,
		connectDropTarget,
		// 这些是组件收到的 props
		index,
		item,
		component,
		style = {},
		find,
		move,
		change,
		remove,
		update,
		...restProps
	} = props;

	const onRemove = (event) => {
		event.stopPropagation();
		remove(item);
	};
	const onUpdate = (value) => {
		item.key = value;
		update(index, item);
	};

	return connectDropTarget(
		// 列表项本身作为 Drop 对象
		connectDragPreview(
			<div>
				<ListItem
					secondaryAction={
						<IconButton edge='end' aria-label='delete' onClick={onRemove}>
							<DeleteIcon />
						</IconButton>
					}>
					<ListItemIcon>
						{connectDragSource(
							<div>
								<DragIndicatorIcon />
							</div>
						)}
					</ListItemIcon>
					{(function () {
						switch (component) {
							case 'input':
								return (
									<Input
										fullWidth
										value={item.key}
										onChange={(event) => onUpdate(event.target.value)}
									/>
								);
							case 'ipv4':
								return (
									<IPv4Input
										fullWidth
										cidr={false}
										value={item.key ? item.key : '...'}
										onChange={onUpdate}
									/>
								);
							case 'ipv6':
								return (
									<IPv6Input
										fullWidth
										value={item.key ? item.key : ':::::'}
										onChange={onUpdate}
									/>
								);
						}
					})()}
				</ListItem>
			</div>
		)
	);
}

const type = 'item';
const dragSpec = {
	// 拖动开始时，返回描述 source 数据。后续通过 monitor.getItem() 获得
	beginDrag: (props) => ({
		id: props.id,
		originalIndex: props.find(props.id).index,
	}),
	// 拖动停止时，处理 source 数据
	endDrag(props, monitor) {
		const { id: droppedId, originalIndex } = monitor.getItem();
		const didDrop = monitor.didDrop();
		// source 是否已经放置在 target
		if (!didDrop) {
			return props.move(droppedId, originalIndex);
		}
		return props.change(droppedId, originalIndex);
	},
};
const dragCollect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(), // 用于包装需要拖动的组件
	connectDragPreview: connect.dragPreview(), // 用于包装需要拖动跟随预览的组件
	isDragging: monitor.isDragging(), // 用于判断是否处于拖动状态
});
const dropSpec = {
	canDrop: () => false, // item 不处理 drop
	hover(props, monitor) {
		const { id: draggedId } = monitor.getItem();
		const { id: overId } = props;
		// 如果 source item 与 target item 不同，则交换位置并重新排序
		if (draggedId !== overId) {
			const { index: overIndex } = props.find(overId);
			props.move(draggedId, overIndex);
		}
	},
};
const dropCollect = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(), // 用于包装需接收拖拽的组件
});

const DndItem = DropTarget(
	type,
	dropSpec,
	dropCollect
)(DragSource(type, dragSpec, dragCollect)(Item));

function List(props) {
	let { list: propsList, connectDropTarget, component } = props;
	const [list, setList] = useState(propsList);

	useEffect(() => {
		setList(propsList);
	}, [propsList]);

	const find = (id) => {
		const item = list.find((c) => `${c.id}` === id);
		return {
			item,
			index: list.indexOf(item),
		};
	};
	const add = () => {
		let n = '';
		if (component == 'ipv4') {
			n = '...';
		}
		if (component == 'ipv6') {
			n = ':::::::';
		}
		list.push({ id: list.length + 1, key: n });
		setList([...list]);
	};
	const move = (id, toIndex) => {
		const { item, index } = find(id);
		list.splice(index, 1);
		list.splice(toIndex, 0, item);
		setList([...list]);
	};
	const change = (id, fromIndex) => {
		const { index: toIndex } = find(id);
		props.onDropEnd(list, fromIndex, toIndex);
	};
	const remove = (item) => {
		const newList = list.filter((it) => it.id !== item.id);
		setList(newList);
		props.onDelete(newList);
	};
	const onClick = (event) => {
		const { id } = event.currentTarget;
		const { item } = find(id);
		props.onClick(item);
	};
	const update = (index, item) => {
		list[index] = item;
		setList(list);
		props.onUpdate(list);
	};

	return connectDropTarget(
		<div>
			<Button variant='text' onClick={add}>
				新增
			</Button>
			{list.map((item, index) => (
				<DndItem
					className='info'
					component={component}
					index={index}
					id={`${item.id}`}
					item={item}
					find={find}
					move={move}
					change={change}
					remove={remove}
					update={update}
					onClick={onClick}
				/>
			))}
		</div>
	);
}

const DndList = DropTarget(type, {}, (connect) => ({
	connectDropTarget: connect.dropTarget(),
}))(List);

export default function collector({ schema, addons, onChange }) {
	const [list, setList] = useState([]);
	const [activeItem, setActiveItem] = useState(list[0]);

	useEffect(() => {
		if (addons) {
			const value = addons.getValue(addons.dataPath) || [];
			let items = [];
			value.map((item, index) => {
				items.push({
					id: index.toString(),
					key: item,
				});
			});
			setList([...items]);
		}
	}, [addons]);

	const handleChange = (list) => {
		onChange(list.map((item) => item.key));
	};
	const onUpdate = (list) => {
		setList([...list]);
		handleChange(list);
	};
	const onClick = (index) => {
		if (index !== activeItem) {
			setActiveItem(index);
		}
	};
	const onDropEnd = (list, fromIndex, toIndex) => {
		setList([...list]);
		handleChange(list);
	};
	const onDelete = (list) => {
		setList([...list]);
		handleChange(list);
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<DndList
				list={list}
				activeItem={activeItem}
				component={schema.component || 'input'}
				onDropEnd={onDropEnd}
				onDelete={onDelete}
				onUpdate={onUpdate}
				onClick={onClick}
			/>
		</DndProvider>
	);
}

export const collectorSetting = {
	text: '元素数组',
	name: 'collector',
	schema: {
		title: '元素数组',
		type: 'any', //底层以此判断布局
		widget: 'collector',
	},
	setting: {
		required: {
			title: '必填',
			type: 'boolean',
		},
		component: {
			title: '组件类型',
			type: 'string',
			enum: ['input', 'ipv4', 'ipv6'],
			enumNames: ['input', 'ipv4', 'ipv6'],
			default: 'input',
		},
		default: {
			title: '默认值',
			type: 'any',
			widget: 'collector',
			default: ['1', '2', '3'],
		},
	},
};
