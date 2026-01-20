import TodoContainer from '../todoContainer';
import { Recurso } from './recursos';
import { IRoute } from '/imports/modules/modulesTypings';

export const todosRouterList: (IRoute | null)[] = [
	{
		path: '/todos/:screenState/:todoId',
		component: TodoContainer,
		isProtected: true,
		resources: [Recurso.TODO_VIEW],
		templateVariant: 'Todo'
	},
	{
		path: '/todos/:screenState',
		component: TodoContainer,
		isProtected: true,
		resources: [Recurso.TODO_CREATE],
		templateVariant: 'Todo'
	},
	{
		path: '/',
		component: TodoContainer,
		isProtected: true,
		resources: [Recurso.TODO_VIEW],
		templateVariant: 'Todo'
	},
];
