import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { AxiosError } from 'axios';

import ApiClient from '../lib/apiClient';

import ActionButtons from './ActionButtons';
import EditModal from './EditModal';
import ErrorMessage from './ErrorMessage';
import FilterButtons from './FilterButtons';
import Form from './Form';
import TodoItem from './TodoItem';

import type { TodoItemType } from '../types';

const Main = () => {
	const [todoItems, setTodoItems] = useState<TodoItemType[]>([]);
	const [currentTodo, setCurrentTodo] = useState<TodoItemType | null>(null);
	const [errorMessage, setErrorMessage] = useState('');
	const [selectedValue, setSelectedValue] = useState('all');
	const [currentUtcTime, setCurrentUtcTime] = useState(new Date());

	useEffect(() => {
		getAllTodos();
	}, []);

	const getAllTodos = async () => {
		try {
			const response = await ApiClient.getTodoItems();
			setTodoItems(response);
			setErrorMessage('');
		} catch (error) {
			// サーバーからのエラーメッセージがある場合
			if (error instanceof AxiosError && error.response) {
				setErrorMessage(error.response.data);
				// 通信エラーやネットワークエラーの場合
			} else {
				setErrorMessage('タスクの読み込みに失敗しました。画面を更新してください。');
			}
		}
	};

	const onUpdateTodo = async (editedTodo: TodoItemType) => {
		if (editedTodo.title === '') {
			alert('件名は必須項目です');
		} else if (editedTodo.dueDate === '') {
			alert('期日は必須項目です');
		} else if (editedTodo.description.length > 100) {
			alert('詳細は100文字以内で入力してください');
		} else {
			try {
				await ApiClient.updateTodoItem(editedTodo);
				setTodoItems(todoItems.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo)));
				setErrorMessage('');
			} catch (error) {
				// サーバーからのエラーメッセージがある場合
				if (error instanceof AxiosError && error.response) {
					setErrorMessage(error.response.data);
					// 通信エラーやネットワークエラーの場合
				} else {
					setErrorMessage('タスクの編集に失敗しました。もう一度お試しください。');
				}
			}
		}
	};

	const handleDeleteTodo = async (id: number) => {
		try {
			await ApiClient.deleteTodoItem(id);
			setTodoItems(todoItems.filter((todo) => todo.id !== id));
			setErrorMessage('');
		} catch (error) {
			// サーバーからのエラーメッセージがある場合
			if (error instanceof AxiosError && error.response) {
				setErrorMessage(error.response.data);
				// 通信エラーやネットワークエラーの場合
			} else {
				setErrorMessage('タスクの削除に失敗しました。もう一度お試しください。');
			}
		}
	};

	const handleToggleTodoStatus = async (id: number) => {
		try {
			const targetTodo = todoItems.find((todo) => todo.id === id);
			if (!targetTodo) {
				return;
			}
			const updatedTodo = await ApiClient.updateTodoStatus(targetTodo);
			setTodoItems(todoItems.map((todo) => (todo.id === targetTodo.id ? updatedTodo : todo)));
			setErrorMessage('');
		} catch (error) {
			// サーバーからのエラーメッセージがある場合
			if (error instanceof AxiosError && error.response) {
				setErrorMessage(error.response.data);
				// 通信エラーやネットワークエラーの場合
			} else {
				setErrorMessage('タスクの状態更新に失敗しました。もう一度お試しください。');
			}
		}
	};

	const onFilterChange = async (filter: string) => {
		try {
			let response;
			switch (filter) {
				case 'incomplete':
					response = await ApiClient.getIncompleteTodoItems();
					break;
				case 'complete':
					response = await ApiClient.getCompletedTodoItems();
					break;
				default:
					response = await ApiClient.getTodoItems();
					break;
			}
			setTodoItems(response);
			setErrorMessage('');
		} catch (error) {
			// サーバーからのエラーメッセージがある場合
			if (error instanceof AxiosError && error.response) {
				setErrorMessage(error.response.data);
				// 通信エラーやネットワークエラーの場合
			} else {
				setErrorMessage('表示の切り替えに失敗しました。もう一度お試しください。');
			}
			setSelectedValue(filter);
		}
	};

	useEffect(() => {
		const timer = setInterval(() => {
			const utcNow = new Date(Date.now());
			setCurrentUtcTime(utcNow);
			// console.log(utcNow.toISOString());
		}, 1000 * 3); // 60秒ごとに更新
		return () => {
			clearInterval(timer);
		};
	}, []);

	const showModal = currentTodo !== null;

	const formatDateForJst = (utcDateString: string) => {
		if (!utcDateString) {
			return '';
		}
		const utcDate = new Date(utcDateString);
		if (isNaN(utcDate.getTime())) {
			return '';
		}
		const formatter = new Intl.DateTimeFormat('ja-JP', {
			timeZone: 'Asia/Tokyo',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		});
		return formatter.format(utcDate);
	};

	const onSetCurrentTodo = (data: TodoItemType) => {
		setCurrentTodo(data);
	};

	return (
		<>
			<Form todoItems={todoItems} setTodoItems={setTodoItems} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
			<FilterButtons selectedValue={selectedValue} onFilterChange={onFilterChange} />
			{todoItems.map((todo) => (
				<Box display="flex" justifyContent="center" alignItems="center" key={todo.id}>
					<ActionButtons
						todo={todo}
						handleToggleTodoStatus={handleToggleTodoStatus}
						onSetCurrentTodo={onSetCurrentTodo}
						handleDeleteTodo={handleDeleteTodo}
					/>
					<TodoItem {...todo} currentUtcTime={currentUtcTime} formatDateForJst={formatDateForJst} />
				</Box>
			))}
			{showModal && <EditModal handleClose={() => setCurrentTodo(null)} onUpdateTodo={onUpdateTodo} currentTodo={currentTodo} />}
			{errorMessage && <ErrorMessage message={errorMessage} handleClose={() => setErrorMessage('')} />}
		</>
	);
};

export default Main;
