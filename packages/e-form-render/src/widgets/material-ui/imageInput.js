import { InputAdornment, Popover, TextField } from '@mui/material';

const DEFAULT_IMG =
	'https://img.alicdn.com/tfs/TB14tSiKhTpK1RjSZFKXXa2wXXa-354-330.png';

const imageInput = ({ schema, value, onChange }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	return (
		<div>
			<TextField
				value={value}
				onChange={(event) => onChange(event.target.value)}
				id={schema['$id'] || null}
				label={schema.title || 'label'}
				size={schema.size || 'small'}
				fullWidth={schema.fullWidth || true}
				variant={schema.variant || 'outlined'}
				// endAdornment={<InputAdornment position="end">kg</InputAdornment>}
				InputProps={{
					endAdornment: (
						<InputAdornment
							position='end'
							aria-owns={open ? 'mouse-over-popover' : undefined}
							aria-haspopup='true'
							onMouseEnter={handlePopoverOpen}
							onMouseLeave={handlePopoverClose}
							aria-label='toggle password visibility'
							edge='end'>
							预览
						</InputAdornment>
					),
				}}
			/>
			<Popover
				id='mouse-over-popover'
				sx={{
					pointerEvents: 'none',
				}}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus
				className='fr-preview'
				placement='bottom'>
				<img src={value || DEFAULT_IMG} alt='图片地址错误' />
			</Popover>
		</div>
	);
};

export default imageInput;

export const imageInputSetting = {
	text: '图片展示',
	name: 'imageInput',
	schema: {
		title: '图片展示',
		type: 'any',
		widget: 'imageInput',
	},
	setting: {},
};
