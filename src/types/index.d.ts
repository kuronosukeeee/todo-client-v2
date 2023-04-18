export type TodoItemType = {
	id: number;
	title: string;
	description: string;
	dueDate: string;
	completedDate: string | null;
	isCompleted: boolean;
};

export type PostDataType = Omit<TodoItemType, id>;

export type ModalPropsType = {
	show: boolean;
	handleClose: () => void;
	handleUpdate: (id: number, currentTodo: TodoItemType, todoItems: TodoItemType[]) => void;
	currentTodo: TodoItemType;
	todoItems: TodoItemType[];
};
