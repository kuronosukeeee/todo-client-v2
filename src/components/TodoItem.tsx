/* eslint-disable no-mixed-spaces-and-tabs */
import { Box, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

import type { TodoItemProps } from '../types';

const TodoItem = ({ title, description, dueDate, isCompleted, currentTime, dueDateString, completedDateString }: TodoItemProps) => {
	const isPastDue = (dueDateUTC: string, currentTime: Date) => {
		const dueDate = new Date(dueDateUTC);
		return currentTime > dueDate;
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
				...(isCompleted ? { textDecoration: 'line-through' } : {}),
				...(isPastDue(dueDate, currentTime)
					? {
							backgroundColor: red[300],
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
					...(isPastDue(dueDate, currentTime)
						? {
								color: red[900],
								fontWeight: 'bold',
						  }
						: {}),
				}}
			>
				{dueDateString}
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
					...(isPastDue(dueDate, currentTime)
						? {
								color: red[900],
								fontWeight: 'bold',
						  }
						: {}),
				}}
			>
				{completedDateString ? '済：' + completedDateString : ''}
			</Typography>
		</Box>
	);
};

export default TodoItem;
