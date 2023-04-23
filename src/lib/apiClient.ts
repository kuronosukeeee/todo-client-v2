import axios from 'axios';

import type { PostDataType, TodoItemType } from '../types/index';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export default class ApiClient {
	static createInstance(): AxiosInstance {
		const instance = axios.create({
			// テスト用
			baseURL: 'http://localhost:5298/api/Todo',
			// 本番用
			// baseURL: 'https://new-employee-todo.azurewebsites.net/api/Todo',
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
	static async getTodoItems(url: string): Promise<any> {
		const instance = this.createInstance();
		try {
			const response: AxiosResponse<TodoItemType[]> = await instance.get(url);
			return response;
		} catch (error) {
			console.error('タスクの取得に失敗しました:', error);
			return Promise.reject(error);
		}
	}

	// 個別取得
	static async getTodoItem(url: string): Promise<any> {
		const instance = this.createInstance();
		try {
			const response: AxiosResponse<TodoItemType> = await instance.get(url);
			return response;
		} catch (error) {
			console.error('タスクの取得に失敗しました:', error);
			return Promise.reject(error);
		}
	}

	// 未完了タスクの取得
	static async getIncompleteTodoItem(url: string): Promise<any> {
		const instance = this.createInstance();
		try {
			const response: AxiosResponse<TodoItemType[]> = await instance.get(url);
			return response;
		} catch (error) {
			console.error('タスクの取得に失敗しました:', error);
			return Promise.reject(error);
		}
	}

	// 完了済タスクの取得
	static async getCompleteTodoItem(url: string): Promise<any> {
		const instance = this.createInstance();
		try {
			const response: AxiosResponse<TodoItemType[]> = await instance.get(url);
			return response;
		} catch (error) {
			console.error('タスクの取得に失敗しました:', error);
			return Promise.reject(error);
		}
	}

	// 追加
	static async postTodoItem(url: string, data?: PostDataType): Promise<any> {
		const instance = this.createInstance();
		try {
			const response: AxiosResponse<TodoItemType> = await instance.post(url, data);
			return response;
		} catch (error) {
			console.error('タスクの追加に失敗しました:', error);
			return Promise.reject(error);
		}
	}

	// 更新
	static async updateTodoItem(url: string, data?: TodoItemType): Promise<any> {
		const instance = this.createInstance();
		try {
			const response: AxiosResponse<TodoItemType> = await instance.put(url, data);
			return response;
		} catch (error) {
			console.error('タスクの更新に失敗しました:', error);
			return Promise.reject(error);
		}
	}

	// 削除
	static async deleteTodoItem(url: string): Promise<any> {
		const instance = this.createInstance();
		try {
			const response: AxiosResponse<TodoItemType> = await instance.delete(url);
			return response;
		} catch (error) {
			console.error('タスクの削除に失敗しました:', error);
			return Promise.reject(error);
		}
	}
}
