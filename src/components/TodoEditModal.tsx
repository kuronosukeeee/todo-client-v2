import React, { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

import type { TodoEditModalPropsType, TodoItemType } from '../types';

const TodoEditModal = ({ handleClose, onUpdateTodo, currentTodo }: TodoEditModalPropsType) => {
	const [editedTodo, setEditedTodo] = useState(currentTodo);

	const handleChange = (key: keyof TodoItemType, value: string | boolean | null) => {
		setEditedTodo({ ...editedTodo, [key]: value });
	};

	const handleSubmit = () => {
		onUpdateTodo(editedTodo);
		handleClose();
	};

	const utcToJst = (utcDateString: string) => {
		if (!utcDateString) {
			alert('期日は必須項目です');
		} else {
			const utcDate = new Date(utcDateString);
			const jstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
			return jstDate.toISOString().slice(0, 16);
		}
	};

	if (!currentTodo) {
		return null;
	}

	return (
		<Box
			sx={{
				position: 'fixed',
				zIndex: 9999,
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(0, 0, 0, 0.6)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			onClick={handleClose}
		>
			<Box
				sx={{
					p: 2,
					backgroundColor: 'white',
					maxWidth: '400px',
					borderRadius: '8px',
					boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
				}}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<h2>タスクを編集する</h2>
				<br />
				<TextField
					label="件名"
					value={editedTodo.title}
					onChange={(e) => {
						handleChange('title', e.target.value);
					}}
					fullWidth
					margin="dense"
					sx={{ mb: 2 }}
				></TextField>
				<TextField
					label="詳細"
					value={editedTodo.description}
					onChange={(e) => {
						handleChange('description', e.target.value);
					}}
					multiline
					rows={5}
					fullWidth
					margin="dense"
					sx={{ mb: 2 }}
				></TextField>
				<TextField
					label="期日"
					type="datetime-local"
					value={utcToJst(editedTodo.dueDate)}
					onChange={(e) => {
						handleChange('dueDate', e.target.value);
					}}
					margin="dense"
					fullWidth
					sx={{ mb: 2 }}
				></TextField>
				<Box>
					<Button
						variant="contained"
						onClick={handleSubmit}
						sx={{ backgroundColor: blue[600], '&:hover': { backgroundColor: blue[800] }, mr: 1, mt: 0.25 }}
					>
						更新
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={handleClose}
						sx={{ backgroundColor: grey[600], '&:hover': { backgroundColor: grey[800] }, mt: 0.25 }}
					>
						閉じる
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default TodoEditModal;
