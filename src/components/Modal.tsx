import React, { useState } from 'react';
import { ModalPropsType, TodoItemType } from '@/types';

const Modal = ({ show, handleClose, handleUpdate, currentTodo, todoItems }: ModalPropsType) => {
	const [updateTitle, setUpdateTitle] = useState(currentTodo.title);
	const [updateDescription, setUpdateDescription] = useState(currentTodo.description);
	const [updateDueDate, setUpdateDueDate_UTC] = useState(currentTodo.dueDate);

	const editedTodo: TodoItemType = {
		id: currentTodo.id,
		title: updateTitle,
		description: updateDescription,
		dueDate: updateDueDate,
		completedDate: null,
		isCompleted: false,
	};

	const handleSubmit = () => {
		handleUpdate(editedTodo.id, editedTodo, todoItems);
		handleClose();
	};

	if (!show) {
		return null;
	}

	// UTCをJSTに変換
	const utcDate = new Date(currentTodo.dueDate);
	const jstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
	const currentTodoDueDate_JST = jstDate.toISOString().slice(0, 16);

	return (
		<div className="modal">
			<div className="modal-content">
				<h4>タスクを編集する</h4>
				<br />
				<label>
					件名:
					<input
						type="text"
						defaultValue={currentTodo.title}
						value={updateTitle}
						onChange={(e) => {
							setUpdateTitle(e.target.value);
						}}
					/>
				</label>
				<br />
				<label>
					詳細:
					<textarea
						defaultValue={currentTodo.description}
						value={updateDescription}
						onChange={(e) => {
							setUpdateDescription(e.target.value);
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
						defaultValue={currentTodoDueDate_JST}
						value={updateDueDate}
						onChange={(e) => {
							setUpdateDueDate_UTC(e.target.value);
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
