import { useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import Modal from './Modal';
import TodoItem from './TodoItem';
import ApiClient from '@/lib/apiClient';
import { TodoItemType } from '@/types';

const TodoList = () => {
	const todoItemMock: TodoItemType = {
		id: 0,
		title: '',
		description: '',
		dueDate: '',
		completedDate: null,
		isCompleted: false,
	};
	const [todoItems, setTodoItems] = useState<TodoItemType[]>([]);
	const [currentTodo, setCurrentTodo] = useState<TodoItemType>(todoItemMock);
	const [showModal, setShowModal] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			const response = await ApiClient.getTodoItems('');
			setTodoItems(response.data);
		};
		fetchData();
	}, []);

	const handleEditTodo = (todo: TodoItemType) => {
		setCurrentTodo(todo);
		setShowModal(true);
	};

	// currentTodoが取得できたかどうかの確認
	useEffect(() => {
		console.log(currentTodo);
	}, [currentTodo]);

	const handleClose = () => {
		setShowModal(false);
	};

	const handleUpdate = async (id: number, editedTodo: TodoItemType, todoItems: TodoItemType[]) => {
		await ApiClient.updateTodoItem(`/${id}`, editedTodo);
		setTodoItems(todoItems.map((todo) => (todo.id === id ? editedTodo : todo)));
	};

	const handleDeleteTodo = async (id: number) => {
		await ApiClient.deleteTodoItem(`/${id}`);
		setTodoItems(todoItems.filter((todo) => todo.id !== id));
	};

	return (
		<>
			<AddTodoForm todoItems={todoItems} setTodoItems={setTodoItems} />
			<ul>
				{todoItems.map((todo) => (
					<li key={todo.id}>
						<button
							onClick={() => {
								handleEditTodo(todo);
							}}
						>
							編集
						</button>
						<button
							onClick={() => {
								handleDeleteTodo(todo.id);
							}}
						>
							削除
						</button>
						<TodoItem {...todo} />
					</li>
				))}
				<Modal
					show={showModal}
					handleClose={handleClose}
					handleUpdate={() => {
						handleUpdate(currentTodo.id, currentTodo, todoItems);
					}}
					currentTodo={currentTodo}
					todoItems={todoItems}
				/>
			</ul>
		</>
	);
};

export default TodoList;
