import type { NextPage } from 'next';
import TodoList from '@/components/TodoList';

const Home: NextPage = () => {
	return (
		<>
			<h1>TODOリスト</h1>
			<TodoList />
		</>
	);
};

export default Home;
