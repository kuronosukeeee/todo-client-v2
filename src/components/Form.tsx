import { useState } from 'react';

import { Box, Button, Container, TextField } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { AxiosError } from 'axios';

import ApiClient from '../lib/apiClient';

import ErrorMessage from './ErrorMessage';

import type { FormProps } from '../types';

const AddTodoForm = ({ todoItems, setTodoItems, errorMessage, setErrorMessage }: FormProps) => {
	const [inputTitle, setInputTitle] = useState('');
	const [inputDescription, setInputDescription] = useState('');
	const [inputDueDate, setInputDueDate] = useState('');

	const handleAddTodo = async () => {
		if (inputTitle === '') {
			alert('件名は必須項目です');
		} else if (inputDueDate === '') {
			alert('期日は必須項目です');
		} else if (inputDescription.length > 100) {
			alert('詳細は100文字以内で入力してください');
		} else {
			try {
				const dueDate = new Date(inputDueDate).toISOString();

				const response = await ApiClient.postTodoItem({
					title: inputTitle,
					description: inputDescription,
					dueDate: dueDate,
				});
				setTodoItems([...todoItems, response]);
				resetTodo();
				setErrorMessage('');
			} catch (error) {
				// サーバーからのエラーメッセージがある場合
				if (error instanceof AxiosError && error.response) {
					setErrorMessage(error.response.data.message);
					// 通信エラーやネットワークエラーの場合
				} else {
					setErrorMessage('タスクの追加に失敗しました。もう一度お試しください。');
				}
			}
		}
	};

	const resetTodo = () => {
		setInputTitle('');
		setInputDescription('');
		setInputDueDate('');
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
					value={inputDueDate}
					onChange={(e) => {
						setInputDueDate(e.target.value);
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
