import { TodoItemType } from '@/types';

const TodoItem = ({ title, description, dueDate }: TodoItemType) => {
	return (
		<>
			<span>{title}</span>
			<span>{description}</span>
			<span>{dueDate}</span>
		</>
	);
};

export default TodoItem;
