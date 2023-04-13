import type { GetServerSideProps, NextPage } from 'next';
import { apiClient } from '@/shared/lib/apiClient';
import { TodoItem } from '@/shared/types';

type HomeProps = {
	todoitems: TodoItem[];
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	const response = await apiClient.get<TodoItem[]>('api/Todo');
	return { props: { todoitems: response.data } };
};

const Home: NextPage<HomeProps> = (props) => {
	const { todoitems } = props;
	return (
		<>
			<h1>TODOリスト</h1>
			<ul>
				{todoitems.map((todo) => (
					<li key={todo.id}>
						{todo.title}/{todo.description}/{todo.dueDate}
					</li>
				))}
			</ul>
		</>
	);
};

export default Home;
