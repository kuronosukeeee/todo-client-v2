export type TodoItemType = {
	id: number;
	title: string;
	description: string;
	dueDate: string;
	completionDate: string | null;
};

export type TodoItemProps = TodoItem & {
	currentUtcTime: Date;
	formatDateForJst: (utcDateString: string) => string;
};

export type PostData = Omit<TodoItem, id>;

export type EditModalProps = {
	handleClose: () => void;
	onUpdateTodo: (editedTodo: TodoItem) => void;
	currentTodo: TodoItem;
};

export type FormProps = {
	todoItems: TodoItem[];
	setTodoItems: (todoItems: TodoItem[]) => void;
	errorMessage: string;
	setErrorMessage: (messege: string) => void;
};

export type ErrorMessageProps = {
	message: string;
	handleClose: () => void;
};

export type FilterButtonsProps = {
	selectedValue: string;
	onFilterChange: (filterOption: 'all' | 'incomplete' | 'complete') => void;
};

export type ActionButtonsProps = {
	todo: TodoItem;
	handleToggleTodoStatus: (id: number) => void;
	onSetCurrentTodo: (TodoItem: TodoItemType) => void;
	handleDeleteTodo: (id: number) => void;
};
