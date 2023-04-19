export type TodoItemType = {
	id: number;
	title: string;
	description: string;
	dueDate: string;
	completedDate: string | null;
	isCompleted: boolean;
};

export type PostDataType = Omit<TodoItemType, id>;

export type TodoEditModalPropsType = {
	handleClose: () => void;
	onUpdateTodo: (editedTodo: TodoItemType) => void;
	currentTodo: TodoItemType;
};
