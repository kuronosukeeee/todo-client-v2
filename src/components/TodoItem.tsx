/* eslint-disable no-mixed-spaces-and-tabs */
import { Box, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

import type { TodoItemProps } from '../types';

const TodoItem = ({ title, description, dueDate, completionDate, currentUtcTime, formatDateForJst }: TodoItemProps) => {
	const isPastDue = (dueDateUTC: string, currentUtcTime: Date) => {
		const dueDate = new Date(dueDateUTC);
		return currentUtcTime > dueDate;
	};

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr 1fr 1fr',
				gap: 1,
				alignItems: 'center',
				backgroundColor: 'background.paper',
				padding: 1,
				borderRadius: 1,
				boxShadow: 1,
				...(completionDate ? { textDecoration: 'line-through' } : {}),
				...(isPastDue(dueDate, currentUtcTime)
					? {
							backgroundColor: red[200],
					  }
					: {}),
			}}
		>
			<Typography
				variant="body1"
				sx={{
					textAlign: 'center',
					minHeight: '2em',
					maxHeight: '2em',
					minWidth: '12em',
					maxWidth: '12em',
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					lineHeight: '2em',
					...(isPastDue(dueDate, currentUtcTime)
						? {
								fontWeight: 'bold',
						  }
						: {}),
				}}
			>
				{title}
			</Typography>
			<Typography
				variant="body2"
				color="text.secondary"
				sx={{
					minHeight: '2em',
					maxHeight: '2em',
					minWidth: '12em',
					maxWidth: '12em',
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					lineHeight: '2em',
				}}
			>
				{description}
			</Typography>
			<Typography
				variant="body1"
				sx={{
					textAlign: 'center',
					minHeight: '2em',
					maxHeight: '2em',
					minWidth: '12em',
					maxWidth: '12em',
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					lineHeight: '2em',
					...(isPastDue(dueDate, currentUtcTime)
						? {
								color: red[800],
								fontWeight: 'bold',
						  }
						: {}),
				}}
			>
				{formatDateForJst(dueDate)}
			</Typography>
			<Typography
				variant="body1"
				sx={{
					textAlign: 'center',
					minHeight: '2em',
					maxHeight: '2em',
					minWidth: '12em',
					maxWidth: '12em',
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					lineHeight: '2em',
				}}
			>
				{completionDate ? '済：' + formatDateForJst(completionDate) : ''}
			</Typography>
		</Box>
	);
};

export default TodoItem;
