import React, { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

import type { EditModalProps, TodoItemType } from '../types';

const TodoEditModal = ({ handleClose, onUpdateTodo, currentTodo }: EditModalProps) => {
	const [editedTodo, setEditedTodo] = useState(currentTodo);

	const handleChange = (key: keyof TodoItemType, value: string | string | string) => {
		if (key === 'dueDate') {
			const dueDate = new Date(value).toISOString();
			value = dueDate;
		}
		setEditedTodo({ ...editedTodo, [key]: value });
	};

	const handleSubmit = () => {
		onUpdateTodo(editedTodo);
		handleClose();
	};

	const formatDateForInputElement = (dateString: string) => {
		const parsedDate = new Date(dateString);

		const formatter = new Intl.DateTimeFormat('ja-JP', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'Asia/Tokyo',
		});

		const formattedParts = formatter.formatToParts(parsedDate);
		const year = formattedParts.find((part) => part.type === 'year')?.value;
		const month = formattedParts.find((part) => part.type === 'month')?.value;
		const day = formattedParts.find((part) => part.type === 'day')?.value;
		const hour = formattedParts.find((part) => part.type === 'hour')?.value;
		const minute = formattedParts.find((part) => part.type === 'minute')?.value;

		return `${year}-${month}-${day}T${hour}:${minute}`;
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
					InputLabelProps={{
						shrink: true,
					}}
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
					InputLabelProps={{
						shrink: true,
					}}
					margin="dense"
					sx={{ mb: 2 }}
				></TextField>
				<TextField
					label="期日"
					type="datetime-local"
					value={formatDateForInputElement(editedTodo.dueDate)}
					onChange={(e) => {
						handleChange('dueDate', e.target.value);
					}}
					margin="dense"
					fullWidth
					InputLabelProps={{
						shrink: true,
					}}
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
