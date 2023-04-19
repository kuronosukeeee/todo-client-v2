import { useState } from 'react';
import ApiClient from '@/lib/apiClient';
import { TodoItemType } from '@/types';

type AddTodoFormProps = {
	todoItems: TodoItemType[];
	setTodoItems: (todoItems: TodoItemType[]) => void;
};

const AddTodoForm = ({ todoItems, setTodoItems }: AddTodoFormProps) => {
	const [inputTitle, setInputTitle] = useState('');
	const [inputDescription, setInputDescription] = useState('');
	const [inputDueDate_JST, setinputDueDate_JST] = useState('');

	const handleAddTodo = async () => {
		const response = await ApiClient.postTodoItem('', {
			title: inputTitle,
			description: inputDescription,
			dueDate: inputDueDate_JST,
			completedDate: null,
			isCompleted: false,
		});
		setTodoItems([...todoItems, response.data]);
		resetTodo();
	};

	const resetTodo = () => {
		setInputTitle('');
		setInputDescription('');
		setinputDueDate_JST('');
	};

	return (
		<>
			<label>
				件名:
				<input type="text" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
			</label>
			<br />
			<label>
				詳細:
				<textarea value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} maxLength={100} rows={5} cols={33} />
			</label>
			<br />
			<label>
				期日:
				<input
					type="datetime-local"
					value={inputDueDate_JST}
					onChange={(e) => {
						setinputDueDate_JST(e.target.value);
					}}
				/>
			</label>
			<br />
			<button onClick={handleAddTodo}>追加</button>
			<button onClick={resetTodo}>取消</button>
		</>
	);
};

export default AddTodoForm;
