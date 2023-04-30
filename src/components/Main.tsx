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

import type { MainProps, TodoItemType } from '../types';

const Main = ({ initialTodoItems, errorMessage, onSetErrorMessage }: MainProps) => {
	const [todoItems, setTodoItems] = useState<TodoItemType[]>(initialTodoItems);
	const [currentTodo, setCurrentTodo] = useState<TodoItemType | null>(null);
	const [selectedValue, setSelectedValue] = useState('all');
	const [currentUtcTime, setCurrentUtcTime] = useState(new Date());

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
				onSetErrorMessage('');
			} catch (error) {
				// サーバーからのエラーメッセージがある場合
				if (error instanceof AxiosError && error.response) {
					onSetErrorMessage(error.response.data);
					// 通信エラーやネットワークエラーの場合
				} else {
					onSetErrorMessage('タスクの編集に失敗しました。もう一度お試しください。');
				}
			}
		}
	};

	const handleDeleteTodo = async (id: number) => {
		try {
			await ApiClient.deleteTodoItem(id);
			setTodoItems(todoItems.filter((todo) => todo.id !== id));
			onSetErrorMessage('');
		} catch (error) {
			// サーバーからのエラーメッセージがある場合
			if (error instanceof AxiosError && error.response) {
				onSetErrorMessage(error.response.data);
				// 通信エラーやネットワークエラーの場合
			} else {
				onSetErrorMessage('タスクの削除に失敗しました。もう一度お試しください。');
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
			onSetErrorMessage('');
		} catch (error) {
			// サーバーからのエラーメッセージがある場合
			if (error instanceof AxiosError && error.response) {
				onSetErrorMessage(error.response.data);
				// 通信エラーやネットワークエラーの場合
			} else {
				onSetErrorMessage('タスクの状態更新に失敗しました。もう一度お試しください。');
			}
		}
	};

	const onFilterChange = async (filter: string) => {
		setSelectedValue(filter);
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
			onSetErrorMessage('');
		} catch (error) {
			// サーバーからのエラーメッセージがある場合
			if (error instanceof AxiosError && error.response) {
				onSetErrorMessage(error.response.data);
				// 通信エラーやネットワークエラーの場合
			} else {
				onSetErrorMessage('表示の切り替えに失敗しました。もう一度お試しください。');
			}
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
			<Form todoItems={todoItems} setTodoItems={setTodoItems} errorMessage={errorMessage} onSetErrorMessage={onSetErrorMessage} />
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
			{errorMessage && <ErrorMessage message={errorMessage} handleClose={() => onSetErrorMessage('')} />}
		</>
	);
};

export default Main;
