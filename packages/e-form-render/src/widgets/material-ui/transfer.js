import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

function not(a, b) {
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
	return [...a, ...not(b, a)];
}

const transfer = ({ schema, value, onChange }) => {
	const [checked, setChecked] = React.useState([]);

	const _left = value && value.left ? value.left : [];
	const _right = value && value.right ? value.right : [];

	const [left, setLeft] = React.useState(_left);
	const [right, setRight] = React.useState(_right);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	const handleAllRight = () => {
		setRight(right.concat(left));
		setLeft([]);
	};

	const handleAllLeft = () => {
		setLeft(left.concat(right));
		setRight([]);
	};

	React.useEffect(() => onChange({ left: left, right: right }), [left, right]);

	const customList = (title, items) => (
		<Card>
			<CardHeader
				sx={{ px: 2, py: 1 }}
				avatar={
					<Checkbox
						onClick={handleToggleAll(items)}
						checked={
							numberOfChecked(items) === items.length && items.length !== 0
						}
						indeterminate={
							numberOfChecked(items) !== items.length &&
							numberOfChecked(items) !== 0
						}
						disabled={items.length === 0}
						inputProps={{
							'aria-label': '?????????????????????',
						}}
					/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${items.length} ??????`}
			/>
			<Divider />
			<List
				sx={{
					width: schema.listWidth || 300,
					height: schema.listHeight || 400,
					bgcolor: 'background.paper',
					overflow: 'auto',
				}}
				dense
				component='div'
				role='list'>
				{items.map((value, index) => {
					const labelId = `${index}-${value}`;
					return (
						<ListItem
							key={value}
							role='listitem'
							button
							onClick={handleToggle(value)}>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{
										'aria-labelledby': labelId,
									}}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={`${value}`} />
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Card>
	);

	return (
		<FormControl fullWidth>
			<Grid container spacing={2} justifyContent='center' alignItems='center'>
				<Grid item>{customList(schema.leftName || '??????', left)}</Grid>
				<Grid item>
					<Grid container direction='column' alignItems='center'>
						<Button
							sx={{ my: 0.5 }}
							variant='outlined'
							size='small'
							onClick={handleAllRight}
							disabled={left.length === 0}
							aria-label='move all right'>
							???
						</Button>
						<Button
							sx={{ my: 0.5 }}
							variant='outlined'
							size='small'
							onClick={handleCheckedRight}
							disabled={leftChecked.length === 0}
							aria-label='move selected right'>
							&gt;
						</Button>
						<Button
							sx={{ my: 0.5 }}
							variant='outlined'
							size='small'
							onClick={handleCheckedLeft}
							disabled={rightChecked.length === 0}
							aria-label='move selected left'>
							&lt;
						</Button>
						<Button
							sx={{ my: 0.5 }}
							variant='outlined'
							size='small'
							onClick={handleAllLeft}
							disabled={right.length === 0}
							aria-label='move all left'>
							???
						</Button>
					</Grid>
				</Grid>
				<Grid item>{customList(schema.rightName || '??????', right)}</Grid>
			</Grid>
		</FormControl>
	);
};

export default transfer;

export const transferSetting = {
	text: '?????????',
	name: 'any',
	schema: {
		title: '?????????',
		type: 'any',
		widget: 'transfer',
		default: {
			left: ['1', '2', '3', '4'],
			right: ['5', '6', '7', '8'],
		},
	},
	setting: {
		required: {
			title: '??????',
			type: 'boolean',
			default: true,
		},
		helperText: {
			title: '??????',
			type: 'string',
		},
		leftName: {
			title: '????????????',
			type: 'string',
			default: '??????',
		},
		rightName: {
			title: '????????????',
			type: 'string',
			default: '??????',
		},
		listWidth: {
			title: '????????????',
			type: 'number',
			default: 300,
		},
		listHeight: {
			title: '????????????',
			type: 'number',
			default: 400,
		},
	},
};
