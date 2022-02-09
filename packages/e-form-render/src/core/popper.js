import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import { useState } from 'react';

function Popconfirm({ title, onConfirm, okText, cancelText, children }) {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleOK = () => {
		onConfirm();
		handleClose();
	};

	const open = Boolean(anchorEl);
	const id = open ? 'confirm-popover' : undefined;

	return (
		<>
			<IconButton
				size='small'
				color='primary'
				aria-describedby={id}
				onClick={handleClick}>
				{children}
			</IconButton>
			<Popover
				id={id}
				open={open}
				arrow={true}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 50,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}>
				<DialogContent dividers sx={{ pb: 1, pt: 1.5 }}>
					<DialogContentText sx={{ fontSize: '15px' }}>
						{title}
					</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ p: 0.1 }}>
					<Button size='small' onClick={handleClose}>
						{cancelText}
					</Button>
					<Button size='small' onClick={handleOK}>
						{okText}
					</Button>
				</DialogActions>
			</Popover>
		</>
	);
}

export default Popconfirm;
