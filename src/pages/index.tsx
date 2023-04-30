import { useState } from 'react';

import Main from '../components/Main';
import ApiClient from '../lib/apiClient';

import type { TodoItemType } from '../types/';
import type { GetServerSideProps, NextPage } from 'next';

const Home: NextPage<{ initialTodoItems: TodoItemType[]; initialErrorMessage: string }> = ({ initialTodoItems, initialErrorMessage }) => {
	const [errorMessage, setErrorMessage] = useState(initialErrorMessage);
	const handleSetErrorMessage = (message: string) => {
		setErrorMessage(message);
	};
	return (
		<>
			<Main initialTodoItems={initialTodoItems} errorMessage={errorMessage} onSetErrorMessage={handleSetErrorMessage} />
		</>
	);
};

// 初回マウント時のみSSRで行う（それ以降はCSR）
export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const FirstFetch = await ApiClient.getTodoItems();
		return { props: { initialTodoItems: FirstFetch, initialErrorMessage: '' } };
	} catch (error) {
		return { props: { initialTodoItems: [], initialErrorMessage: 'タスクの読み込みに失敗しました。画面を更新してください。' } };
	}
};

export default Home;
