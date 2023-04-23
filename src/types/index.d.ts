export type TodoItemType = {
	id: number;
	title: string;
	description: string;
	dueDate: string;
	completedDate: string | null;
	isCompleted: boolean;
	dueDateString: string;
	completedDateString: string | null;
};

export type TodoItemProps = TodoItemType & {
	currentTime: Date;
};

export type PostDataType = Omit<TodoItemType, id>;

export type TodoEditModalPropsType = {
	handleClose: () => void;
	onUpdateTodo: (editedTodo: TodoItemType) => void;
	currentTodo: TodoItemType;
};

export type AddTodoFormProps = {
	todoItems: TodoItemType[];
	setTodoItems: (todoItems: TodoItemType[]) => void;
	errorMessage: string;
	setErrorMessage: (messege: string) => void;
};

export type ErrorMessageProps = {
	message: string;
	handleClose: () => void;
};

export type TodoFilterRadioButtonsProps = {
	selectedValue: string;
	onFilterChange: (filterOption: 'all' | 'incomplete' | 'complete') => void;
};
