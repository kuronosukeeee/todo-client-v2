/* eslint-disable no-mixed-spaces-and-tabs */
import { Box, Typography } from '@mui/material';
import { red, yellow } from '@mui/material/colors';

import type { TodoItemType } from '../types';

const TodoItem = ({ title, description, dueDate, isCompleted }: TodoItemType) => {
	// UTCをJSTに変換して表示
	const utcDate = new Date(dueDate);
	const jstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
	const dueDate_JST = jstDate.toISOString().slice(0, 16);

	const isPastDue = (dueDateUTC: string) => {
		const currentDateTime = new Date();
		const dueDate = new Date(dueDateUTC);
		return currentDateTime > dueDate;
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
				...(isPastDue(dueDate)
					? {
							backgroundColor: red[100],
							fontWeight: 'bold',
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
					maxWidth: '10em',
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					lineHeight: '2em',
					...(isPastDue(dueDate)
						? {
								color: red[300],
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
