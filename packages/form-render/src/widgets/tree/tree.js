import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Tree from 'rc-tree';
import React, { useRef, useState } from 'react';
import './tree.less';

function renderSwitcherIcon(
	prefixCls,
	showLine,
	{ isLeaf, expanded, loading }
) {
	let showLeafIcon;
	if (showLine && typeof showLine === 'object') {
		showLeafIcon = showLine.showLeafIcon;
	}
	if (isLeaf) {
		if (showLine) {
			if (typeof showLine === 'object' && !showLeafIcon) {
				return <span className={`${prefixCls}-switcher-leaf-line`} />;
			}
		}
		return null;
	}

	if (showLine) {
		return expanded ? (
			<ArrowDropDownOutlinedIcon fontSize='small' color='primary' />
		) : (
			<ArrowRightOutlinedIcon fontSize='small' color='primary' />
		);
	}

	return <ArrowDropDownIcon fontSize='small' color='primary' />;
}

const tree = ({ schema, value, onChange }) => {
	const treeRef = useRef(null);
	const [selectedKeys, setSelectedKeys] = useState([]);
	const [checkedKeys, setCheckedKeys] = useState(value || []);

	const treeData = schema.treeData ? schema.treeData : [];

	const onSelect = (selectedKeys, info) => {
		console.log('debug', schema.debug);
		schema.debug ? console.log('selected', selectedKeys, info) : false;
	};

	const onExpand = (expandedKeys) => {
		schema.debug ? console.log('onExpand', expandedKeys) : false;
	};

	const onCheck = (checkedKeys, info) => {
		schema.debug ? console.log('onCheck', checkedKeys, info) : false;
		setCheckedKeys(checkedKeys);
		onChange(checkedKeys);
	};

	React.useEffect(() => {
		setCheckedKeys(value);
	}, [value]);

	return (
		<FormControl component='fieldset' variant='standard'>
			<FormHelperText>{schema.helperText || ''}</FormHelperText>
			<Tree
				ref={treeRef}
				treeData={treeData}
				showLine={false}
				checkable
				selectable={false}
				defaultExpandAll
				onExpand={onExpand}
				checkedKeys={checkedKeys}
				selectedKeys={selectedKeys}
				onSelect={onSelect}
				onCheck={onCheck}
				switcherIcon={(nodeProps) => renderSwitcherIcon('', true, nodeProps)}
			/>
		</FormControl>
	);
};

export default tree;

// treeData
export const treeSetting = {
	text: '树🌲',
	name: 'any',
	schema: {
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
						children: [{ key: '0-0-0-0', title: 'parent 1-1-0' }],
					},
					{
						key: '0-0-1',
						title: 'parent 1-2',
						children: [
							{ key: '0-0-1-0', title: 'parent 1-2-0' },
							{ key: '0-0-1-1', title: 'parent 1-2-1' },
							{ key: '0-0-1-2', title: 'parent 1-2-2' },
							{ key: '0-0-1-3', title: 'parent 1-2-3' },
							{ key: '0-0-1-4', title: 'parent 1-2-4' },
							{ key: '0-0-1-5', title: 'parent 1-2-5' },
							{ key: '0-0-1-6', title: 'parent 1-2-6' },
							{ key: '0-0-1-7', title: 'parent 1-2-7' },
							{ key: '0-0-1-8', title: 'parent 1-2-8' },
							{ key: '0-0-1-9', title: 'parent 1-2-9' },
						],
					},
				],
			},
		],
		default: ['0-0-1-0', '0-0-1-1'],
	},
	setting: {
		required: {
			title: '必填',
			type: 'boolean',
			default: true,
		},
		debug: {
			title: 'debug',
			type: 'boolean',
			default: false,
		},
	},
};
