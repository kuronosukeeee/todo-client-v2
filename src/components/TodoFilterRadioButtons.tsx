type TodoFilterRadioButtonsProps = {
	onFilterChange: (filterOption: 'all' | 'incomplete' | 'complete') => void;
};

const TodoFilterRadioButtons = ({ onFilterChange }: TodoFilterRadioButtonsProps) => {
	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onFilterChange(e.target.value as 'all' | 'incomplete' | 'complete');
	};
	return (
		<div>
			<label>
				<input type="radio" name="todo-filter" value="all" defaultChecked onChange={handleFilterChange} />
				すべて
			</label>
			<label>
				<input type="radio" name="todo-filter" value="incomplete" onChange={handleFilterChange} />
				未完了
			</label>
			<label>
				<input type="radio" name="todo-filter" value="complete" onChange={handleFilterChange} />
				完了済
			</label>
		</div>
	);
};

export default TodoFilterRadioButtons;
