import { useEffect, useState } from 'react';

import AssignmentTurnedInSharpIcon from '@mui/icons-material/AssignmentTurnedInSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Fab } from '@mui/material';
import { green, orange, red } from '@mui/material/colors';

import ApiClient from '../lib/apiClient';

import AddTodoForm from './AddTodoForm';
import ErrorMessage from './ErrorMessage';
import TodoEditModal from './TodoEditModal';
import TodoFilterRadioButtons from './TodoFilterRadioButtons';
import TodoItem from './TodoItem';

import type { TodoItemType } from '../types';

const TodoList = () => {
	const [todoItems, setTodoItems] = useState<TodoItemType[]>([]);
	const [currentTodo, setCurrentTodo] = useState<TodoItemType | null>(null);
	const [errorMessage, setErrorMessage] = useState('');
	const [selectedValue, setSelectedValue] = useState('all');

	const showModal = currentTodo !== null;

	useEffect(() => {
		getAllTodo();
	}, []);

	const getAllTodo = async () => {
		try {
			const response = await ApiClient.getTodoItems('');
			setTodoItems(response.data);
			setErrorMessage('');
		} catch (error) {
			setErrorMessage('タスクの読み込みに失敗しました。画面を更新してください。');
		}
	};

	const onUpdateTodo = async (editedTodo: TodoItemType) => {
		if (editedTodo.title === '') {
			alert('件名は必須項目です');
		} else if (editedTodo.dueDate === '') {
			alert('期日は必須項目です');
		} else {
			try {
				await ApiClient.updateTodoItem(`/${editedTodo.id}`, editedTodo);
				setTodoItems(todoItems.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo)));
				setErrorMessage('');
			} catch (error) {
				setErrorMessage('タスクの編集に失敗しました。もう一度お試しください。');
			}
		}
	};

	const handleDeleteTodo = async (id: number) => {
		try {
			await ApiClient.deleteTodoItem(`/${id}`);
			setTodoItems(todoItems.filter((todo) => todo.id !== id));
			setErrorMessage('');
		} catch (error) {
			setErrorMessage('タスクの削除に失敗しました。もう一度お試しください。');
		}
	};

	const handleToggleTodoCompletion = async (id: number) => {
		const targetTodo = todoItems.find((todo) => todo.id === id);
		if (!targetTodo) {
			return;
		}
		const completedTodo = { ...targetTodo, isCompleted: !targetTodo.isCompleted };
		await onUpdateTodo(completedTodo);
	};

	const onFilterChange = async (filter: string) => {
		try {
			let response;
			switch (filter) {
				case 'incomplete':
					response = await ApiClient.getIncompleteTodoItem('/incomplete');
					break;
				case 'complete':
					response = await ApiClient.getCompleteTodoItem('/completed');
					break;
				default:
					response = await ApiClient.getTodoItems('');
					break;
			}
			setTodoItems(response.data);
			setErrorMessage('');
		} catch (error) {
			setErrorMessage('表示の切り替えに失敗しました。もう一度お試しください。');
		}
		setSelectedValue(filter);
	};

	return (
		<>
			<AddTodoForm todoItems={todoItems} setTodoItems={setTodoItems} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
			<TodoFilterRadioButtons selectedValue={selectedValue} onFilterChange={onFilterChange} />
			{todoItems.map((todo) => (
				<Box display="flex" justifyContent="center" alignItems="center" key={todo.id}>
					<Fab
						size="small"
						color="primary"
						sx={{ backgroundColor: green[600], '&:hover': { backgroundColor: green[800] } }}
						onClick={() => handleToggleTodoCompletion(todo.id)}
					>
						<AssignmentTurnedInSharpIcon />
					</Fab>
					<Fab
						size="small"
						color="inherit"
						sx={{ backgroundColor: orange[600], '&:hover': { backgroundColor: orange[800] }, color: 'white', m: 1.5 }}
						onClick={() => {
							setCurrentTodo(todo);
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
					<TodoItem {...todo} />
				</Box>
			))}
			{showModal && <TodoEditModal handleClose={() => setCurrentTodo(null)} onUpdateTodo={onUpdateTodo} currentTodo={currentTodo} />}
			{errorMessage && <ErrorMessage message={errorMessage} handleClose={() => setErrorMessage('')} />}
		</>
	);
};

export default TodoList;
