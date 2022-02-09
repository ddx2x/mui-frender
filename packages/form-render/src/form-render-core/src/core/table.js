import { DataGrid } from '@mui/x-data-grid';

const table = ({ dataSource, columns }) => {
	return (
		<DataGrid
			disableColumnFilter
			disableColumnMenu
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
	);
};

export default table;