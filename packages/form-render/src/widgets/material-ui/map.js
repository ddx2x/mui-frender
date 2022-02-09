import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Card from './card';

function MapDefault({ children, title, ...rest }) {
	const [collapsed, setCollapsed] = useState(true);
	if (!title) {
		return <div className='w-100'>{children}</div>;
	}

	if (false) {
		return (
			<div className='w-100'>
				<div
					style={{
						fontSize: 17,
						fontWeight: 500,
						paddingBottom: 4,
						borderBottom: '1px solid rgba( 0, 0, 0, .2 )',
						marginBottom: 16,
					}}>
					{title}
				</div>
				<div style={{ marginLeft: 'row' == 'row' ? 0 : 12 }}>{children}</div>
			</div>
		);
	}

	const toggle = () => {
		setCollapsed(!collapsed);
	};

	return (
		<div className='w-100' style={{ marginBottom: '25px' }}>
			<Accordion expanded={collapsed} onChange={toggle}>
				<AccordionSummary
					expandIcon={
						<IconButton color='primary'>
							<ExpandMoreIcon fontSize='inherit' color='inherit' />
						</IconButton>
					}>
					<Typography color='primary' sx={{ width: '33%', flexShrink: 0 }}>
						{title}
					</Typography>
				</AccordionSummary>
				<AccordionDetails>{children}</AccordionDetails>
			</Accordion>
		</div>
	);
}

function MapCard({ children, title, ...rest }) {
	return (
		<Card
			sx={{ mb: 2 }}
			title={title}
			layout={rest?.schema?.layout}
			column={rest?.schema?.column}>
			{children}
		</Card>
	);
}

export default function Map(props) {
	if (props?.schema?.container === 'card') {
		return <MapCard {...props} />;
	}
	return <MapDefault {...props} />;
}

// export default function map({ children, title }) {
//   return <div className="w-100">{children}</div>;
// }
