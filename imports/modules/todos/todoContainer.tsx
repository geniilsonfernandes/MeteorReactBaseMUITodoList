import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import TodoListController from './pages/todoList/todoListController';
import UserTodoListController from './pages/userTodoList/userTodoListController';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';

import { hasValue } from '/imports/libs/hasValue';

export interface ITodoModuleContext {
	state?: 'create' | 'view' | 'edit' | 'list';
	id?: string;
}

export const TodoModuleContext = React.createContext<ITodoModuleContext>({});

export default (props: IDefaultContainerProps) => {
	let { screenState, todoId } = useParams();

	const state = screenState ?? props.screenState;

	console.log({ screenState, todoId });
	
	const id = todoId ?? props.id;

	const validState = ['view', 'edit', 'create', 'list'];
	const isValideState = hasValue(state) && validState.includes(state!);

	const renderPage = useCallback(() => {
		if (!isValideState) return <TodoListController />;
		if (state === 'list') return <UserTodoListController />;
		return <TodoListController />;
	}, [isValideState]);

	const providerValue = {
		state: !isValideState ? undefined : state as 'create' | 'view' | 'edit' | 'list' | undefined,
		id
	};
	return <TodoModuleContext.Provider value={providerValue}>{renderPage()}</TodoModuleContext.Provider>;
};
