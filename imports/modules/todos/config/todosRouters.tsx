import TodoContainer from '../todoContainer';
import { Recurso } from './recursos';
import { IRoute } from '/imports/modules/modulesTypings';

export const todosRouterList: (IRoute | null)[] = [
	{
		path: '/todos/:screenState/:todoId',
		component: TodoContainer,
		isProtected: true,
		resources: [Recurso.TODO_VIEW]
	},
	{
		path: '/todos/:screenState',
		component: TodoContainer,
		isProtected: true,
		resources: [Recurso.TODO_CREATE]
	},
	{
		path: '/todos',
		component: TodoContainer,
		isProtected: true,
		resources: [Recurso.TODO_VIEW]
	},
	
];
