import React, { useState } from 'react';
import { ModalPropsType, TodoItemType } from '@/types';

const Modal = ({ handleClose, handleUpdate, currentTodo }: ModalPropsType) => {
	const [editedTodo, setEditedTodo] = useState(currentTodo);

	const handleChange = (key: keyof TodoItemType, value: string | boolean | null) => {
		setEditedTodo({ ...editedTodo, [key]: value });
	};

	const handleSubmit = () => {
		handleUpdate(editedTodo);
		handleClose();
	};

	if (!currentTodo) {
		return null;
	}

	return (
		<div className="modal">
			<div className="modal-content">
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
						value={editedTodo.dueDate}
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

export default Modal;
