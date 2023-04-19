import React, { useState } from 'react';
import { TodoEditModalPropsType, TodoItemType } from '@/types';

const TodoEditModal = ({ handleClose, onUpdateTodo, currentTodo }: TodoEditModalPropsType) => {
	const [editedTodo, setEditedTodo] = useState(currentTodo);

	const handleChange = (key: keyof TodoItemType, value: string | boolean | null) => {
		setEditedTodo({ ...editedTodo, [key]: value });
	};

	const handleSubmit = () => {
		onUpdateTodo(editedTodo);
		handleClose();
	};

	const utcToJst = (utcDateString: string) => {
		if (!utcDateString) {
			alert('期日は必須項目です');
		} else {
			const utcDate = new Date(utcDateString);
			const jstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
			return jstDate.toISOString().slice(0, 16);
		}
	};

	if (!currentTodo) {
		return null;
	}

	return (
		<div className="modal" onClick={handleClose}>
			<div
				className="modal-content"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<h4>タスクを編集する</h4>
				<br />
				<label>
					件名:
					<input
						type="text"
						value={editedTodo.title}
						onChange={(e) => {
							handleChange('title', e.target.value);
						}}
					/>
				</label>
				<br />
				<label>
					詳細:
					<textarea
						value={editedTodo.description}
						onChange={(e) => {
							handleChange('description', e.target.value);
						}}
						maxLength={100}
						rows={5}
						cols={33}
					/>
				</label>
				<br />
				<label>
					期日:
					<input
						type="datetime-local"
						// JSTで表示できるように変換する
						value={utcToJst(editedTodo.dueDate)}
						onChange={(e) => {
							handleChange('dueDate', e.target.value);
						}}
					/>
				</label>
				<br />
				<button onClick={handleSubmit}>更新</button>
				<button onClick={handleClose}>閉じる</button>
			</div>
		</div>
	);
};

export default TodoEditModal;
