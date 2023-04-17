import { useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';
import ApiClient from '@/lib/apiClient';
import { TodoItemType } from '@/types';

const TodoList = () => {
	const [todoItems, setTodoItems] = useState<TodoItemType[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await ApiClient.getTodoItems('');
			setTodoItems(response.data);
		};
		fetchData();
	}, []);

	// const handleEditTodo = (id: number) => {
	// 	const editTodo = async () => {
	// 		await ApiClient.updateTodoItem(`/${id}`);
	// 		setTodoItems(todoItems.filter((todo) => todo.id !== id));
	// 	};
	// 	editTodo();
	// };

	const handleDeleteTodo = (id: number) => {
		const deleteTodo = async () => {
			await ApiClient.deleteTodoItem(`/${id}`);
			setTodoItems(todoItems.filter((todo) => todo.id !== id));
		};
		deleteTodo();
	};

	return (
		<>
			<AddTodoForm todoItems={todoItems} setTodoItems={setTodoItems} />
			<ul>
				{todoItems.map((todo) => (
					<li key={todo.id}>
						{/* <button
							onClick={() => {
								handleEditTodo(todo.id);
							}}
						>
							編集
						</button> */}
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
			</ul>
		</>
	);
};

export default TodoList;
