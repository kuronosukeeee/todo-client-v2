import AssignmentTurnedInSharpIcon from '@mui/icons-material/AssignmentTurnedInSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Fab } from '@mui/material';
import { green, orange, red } from '@mui/material/colors';

import type { ActionButtonsProps } from '../types';

const ActionButtons = ({ todo, handleToggleTodoStatus, onSetCurrentTodo, handleDeleteTodo }: ActionButtonsProps) => {
	return (
		<>
			<Fab
				size="small"
				color="primary"
				sx={{ backgroundColor: green[600], '&:hover': { backgroundColor: green[800] } }}
				onClick={() => handleToggleTodoStatus(todo.id)}
			>
				<AssignmentTurnedInSharpIcon />
			</Fab>
			<Fab
				size="small"
				color="inherit"
				sx={{ backgroundColor: orange[600], '&:hover': { backgroundColor: orange[800] }, color: 'white', m: 1.5 }}
				onClick={() => {
					onSetCurrentTodo(todo);
				}}
			>
				<EditIcon />
			</Fab>
			<Fab
				size="small"
				color="inherit"
				sx={{ backgroundColor: red[600], '&:hover': { backgroundColor: red[800] }, color: 'white', mr: 3 }}
				onClick={() => {
					handleDeleteTodo(todo.id);
				}}
			>
				<DeleteIcon />
			</Fab>
		</>
	);
};

export default ActionButtons;
