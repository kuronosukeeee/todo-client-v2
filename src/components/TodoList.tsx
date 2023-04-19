import { useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import Modal from './Modal';
import TodoItem from './TodoItem';
import ApiClient from '@/lib/apiClient';
import { TodoItemType } from '@/types';

const TodoList = () => {
	const [todoItems, setTodoItems] = useState<TodoItemType[]>([]);
	const [currentTodo, setCurrentTodo] = useState<TodoItemType | null>(null);

	const showModal = currentTodo !== null;

	useEffect(() => {
		const fetchData = async () => {
			const response = await ApiClient.getTodoItems('');
			setTodoItems(response.data);
		};
		fetchData();
	}, []);

	const handleUpdate = async (editedTodo: TodoItemType) => {
		await ApiClient.updateTodoItem(`/${editedTodo.id}`, editedTodo);
		setTodoItems(todoItems.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo)));
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
								setCurrentTodo(todo);
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
				{showModal && <Modal handleClose={() => setCurrentTodo(null)} handleUpdate={handleUpdate} currentTodo={currentTodo} />}
			</ul>
		</>
	);
};

export default TodoList;
