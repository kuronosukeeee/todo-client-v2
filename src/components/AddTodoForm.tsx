import { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import ApiClient from '@/lib/apiClient';
import { AddTodoFormProps } from '@/types';

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
		<>
			<label>
				件名:
				<input type="text" placeholder="*件名と期日は必須です" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
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
			{errorMessage && <ErrorMessage message={errorMessage} handleClose={() => setErrorMessage('')} />}
		</>
	);
};

export default AddTodoForm;
