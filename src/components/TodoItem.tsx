/* eslint-disable no-mixed-spaces-and-tabs */
import { Box, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

import type { TodoItemProps } from '../types';

const TodoItem = ({ title, description, dueDate, isCompleted, currentTime }: TodoItemProps) => {
	// UTCをJSTに変換して表示
	const dueDate_JST = new Date(dueDate).toLocaleString('ja-JP', {
		timeZone: 'Asia/Tokyo',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	});

	const isPastDue = (dueDateUTC: string, currentTime: Date) => {
		const dueDate = new Date(dueDateUTC);
		return currentTime > dueDate;
	};

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr 1fr',
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
					minWidth: '10em',
					maxWidth: '10em',
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
					minWidth: '10em',
					maxWidth: '10em',
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
					minWidth: '10em',
					maxWidth: '10em',
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
				{dueDate_JST}
			</Typography>
		</Box>
	);
};

export default TodoItem;
