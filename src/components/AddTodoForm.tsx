import { useState } from 'react';

import { Box, Button, Container, TextField } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

import ApiClient from '../lib/apiClient';

import ErrorMessage from './ErrorMessage';

import type { AddTodoFormProps } from '../types';

const AddTodoForm = ({ todoItems, setTodoItems, errorMessage, setErrorMessage }: AddTodoFormProps) => {
	const [inputTitle, setInputTitle] = useState('');
	const [inputDescription, setInputDescription] = useState('');
	const [inputDueDate_JST, setinputDueDate_JST] = useState('');

	const handleAddTodo = async () => {
		if (inputTitle === '') {
			alert('件名は必須項目です');
		} else if (inputDueDate_JST === '') {
			alert('期日は必須項目です');
		} else {
			try {
				const response = await ApiClient.postTodoItem('', {
					title: inputTitle,
					description: inputDescription,
					dueDate: inputDueDate_JST,
					completedDate: null,
					isCompleted: false,
				});
				setTodoItems([...todoItems, response.data]);
				resetTodo();
				setErrorMessage('');
			} catch (error) {
				setErrorMessage('タスクの追加に失敗しました。もう一度お試しください。');
			}
		}
	};

	const resetTodo = () => {
		setInputTitle('');
		setInputDescription('');
		setinputDueDate_JST('');
	};

	return (
		<Container maxWidth="sm">
			<Box component="form">
				<TextField
					label="件名（*必須）"
					value={inputTitle}
					onChange={(e) => setInputTitle(e.target.value)}
					fullWidth
					InputLabelProps={{
						shrink: true,
					}}
					margin="dense"
					sx={{ mt: 3 }}
				></TextField>
				<TextField
					label="詳細（100文字以内）"
					value={inputDescription}
					onChange={(e) => setInputDescription(e.target.value)}
					multiline
					rows={5}
					fullWidth
					InputLabelProps={{
						shrink: true,
					}}
					margin="dense"
				></TextField>
				<TextField
					label="期日（*必須）"
					type="datetime-local"
					value={inputDueDate_JST}
					onChange={(e) => {
						setinputDueDate_JST(e.target.value);
					}}
					margin="dense"
					fullWidth
					InputLabelProps={{
						shrink: true,
					}}
				></TextField>
				<Box>
					<Button
						variant="contained"
						onClick={handleAddTodo}
						sx={{ backgroundColor: blue[600], '&:hover': { backgroundColor: blue[800] }, mr: 1, mt: 0.25 }}
					>
						追加
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={resetTodo}
						sx={{ backgroundColor: grey[600], '&:hover': { backgroundColor: grey[800] }, mt: 0.25 }}
					>
						取消
					</Button>
				</Box>
			</Box>
			{errorMessage && <ErrorMessage message={errorMessage} handleClose={() => setErrorMessage('')} />}
		</Container>
	);
};

export default AddTodoForm;
