import axios from 'axios';

import type { PostData, TodoItemType } from '../types/index';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export default class ApiClient {
	static createInstance(): AxiosInstance {
		const instance = axios.create({
			// テスト用
			// baseURL: 'http://localhost:5298/api/Todo',
			// 本番用
			baseURL: 'https://new-employee-todoapi.azurewebsites.net/api/Todo',
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		// instance.interceptors.response.useはレスポンス時の割り込み処理を行う
		// 第一引数に成功時、第二引数に失敗時の処理を受け取る
		instance.interceptors.response.use(
			(config) => this.requestSuccess(config),
			(config) => this.requestFailure(config),
		);
		return instance;
	}

	static requestSuccess(config: AxiosResponse<TodoItemType>): AxiosResponse {
		console.log('リクエストに成功しました', config);
		return config;
	}
	static requestFailure(config: AxiosError): Promise<never> {
		console.log('リクエストに失敗しました', config);
		return Promise.reject(config);
	}

	// 全件取得
	static async getTodoItems(): Promise<TodoItemType[]> {
		const instance = this.createInstance();
		try {
			const response: AxiosResponse<TodoItemType[]> = await instance.get('');
			return response.data;
		} catch (error) {
			console.error('タスクの取得に失敗しました:', error);
			return Promise.reject(error);
		}
	}

	// 未完了タスクの取得
	static async getIncompleteTodoItems(showIncompleteTodos = true): Promise<TodoItemType[]> {
		const instance = this.createInstance();
		try {
			const response: AxiosResponse<TodoItemType[]> = await instance.get('', { params: { showIncompleteTodos } });
			return response.data;
		} catch (error) {
			console.error('タスクの取得に失敗しました:', error);
			return Promise.reject(error);
		}
	}

	// 完了済タスクの取得
	static async getCompletedTodoItems(showCompletedTodos = true): Promise<TodoItemType[]> {
		const instance = this.createInstance();
		try {
			const response: AxiosResponse<TodoItemType[]> = await instance.get('', { params: { showCompletedTodos } });
			return response.data;
		} catch (error) {
			console.error('タスクの取得に失敗しました:', error);
			return Promise.reject(error);
		}
	}

	// 追加
	static async postTodoItem(data: PostData): Promise<TodoItemType> {
		const instance = this.createInstance();
		try {
			const response: AxiosResponse<TodoItemType> = await instance.post('', data);
			return response.data;
		} catch (error) {
			console.error('タスクの追加に失敗しました:', error);
			return Promise.reject(error);
		}
	}

	// 更新
	static async updateTodoItem(data: TodoItemType): Promise<TodoItemType> {
		const instance = this.createInstance();
		try {
			const response: AxiosResponse<TodoItemType> = await instance.put(`${data.id}`, data);
			return response.data;
		} catch (error) {
			console.error('タスクの更新に失敗しました:', error);
			return Promise.reject(error);
		}
	}

	// タスク状態の更新
	static async updateTodoStatus(data: TodoItemType): Promise<TodoItemType> {
		const instance = this.createInstance();
		try {
			const response: AxiosResponse<TodoItemType> = await instance.put(`/Status/${data.id}`, data);
			return response.data;
		} catch (error) {
			console.error('タスクの更新に失敗しました:', error);
			return Promise.reject(error);
		}
	}

	// 削除
	static async deleteTodoItem(id: number): Promise<TodoItemType> {
		const instance = this.createInstance();
		try {
			const response: AxiosResponse<TodoItemType> = await instance.delete(`${id}`);
			return response.data;
		} catch (error) {
			console.error('タスクの削除に失敗しました:', error);
			return Promise.reject(error);
		}
	}
}
