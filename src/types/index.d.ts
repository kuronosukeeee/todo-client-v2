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

type AddTodoFormProps = {
	todoItems: TodoItemType[];
	setTodoItems: (todoItems: TodoItemType[]) => void;
	errorMessage: string;
	setErrorMessage: (messege: string) => void;
};

type ErrorMessageProps = {
	message: string;
	handleClose: () => void;
};

type TodoFilterRadioButtonsProps = {
	selectedValue: string;
	onFilterChange: (filterOption: 'all' | 'incomplete' | 'complete') => void;
};
