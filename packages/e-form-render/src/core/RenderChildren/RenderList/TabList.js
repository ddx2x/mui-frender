/* eslint-disable jsx-a11y/anchor-is-valid */
import MuiTabContext from '@mui/lab/TabContext';
import MuiTabList from '@mui/lab/TabList';
import MuiTabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import MuiTab from '@mui/material/Tab';
import React, { useState } from 'react';
import Core from '../../index';

// TODO: Not Done
const TabList = ({
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
	const [activeKey, setActiveKey] = useState('0');
	const { props = {}, itemProps } = schema;
	const { tabName, type, ...restProps } = props;

	const onEdit = (targetKey, action) => {
		if (action === 'add') {
			const currentKey = addItem();
			setActiveKey(`${currentKey}`);
		} else if (action === 'remove') {
			deleteItem(Number(targetKey));
			setActiveKey(`${targetKey > 1 ? targetKey - 1 : 0}`);
		} else {
			return null;
		}
	};

	const getCurrentTabPaneName = (idx) => {
		return tabName instanceof Array
			? tabName[idx] || idx + 1
			: `${tabName || '项目'} ${idx + 1}`;
	};

	return (
		<MuiTabContext value={activeKey}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<MuiTabList
					onChange={setActiveKey}
					// onEdit={onEdit}
					{...restProps}>
					{displayList.map((item, idx) => {
						const fieldsProps = getFieldsProps(idx);
						fieldsProps.displayType = displayType;
						return (
							<MuiTab
								label={getCurrentTabPaneName(idx)}
								key={`${idx}`}
								value={`${idx}`}
							/>
						);
					})}
				</MuiTabList>
			</Box>
			{displayList.map((item, idx) => {
				const fieldsProps = getFieldsProps(idx);
				fieldsProps.displayType = displayType;
				return (
					<MuiTabPanel value={`${idx}`} index={idx} key={`${idx}`}>
						<Core {...fieldsProps} />
					</MuiTabPanel>
				);
			})}
		</MuiTabContext>
	);
};

export default TabList;
