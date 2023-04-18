import { TodoItemType } from '@/types';

const TodoItem = ({ title, description, dueDate }: TodoItemType) => {
	// UTCをJSTに変換して表示
	const utcDate = new Date(dueDate);
	const jstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
	const dueDate_JST = jstDate.toISOString().slice(0, 16);

	return (
		<>
			<span>{title}</span>
			<span>{description}</span>
			<span>{dueDate_JST}</span>
		</>
	);
};

export default TodoItem;
