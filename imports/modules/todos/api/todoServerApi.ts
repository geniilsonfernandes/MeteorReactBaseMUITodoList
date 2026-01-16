// region Imports
import { Recurso } from '../config/recursos';
import { ITodo, todoSch } from './todoSch';
import { ProductServerBase } from '/imports/api/productServerBase';

// endregion

class TodoServerApi extends ProductServerBase<ITodo> {
	constructor() {
		super('todo', todoSch, { resources: Recurso });

		const self = this;

		this.addPublication(
			'todoList',
			(filter = {}) => {
				return this.defaultListCollectionPublication(filter, {
					projection: { title: 1, description: 1, completed: 1, createdAt: 1, updatedAt: 1, owner: 1, team: 1 }
				});
			},
		);

		this.addPublication('todoDetail', (filter = {}) => {
			return this.defaultDetailCollectionPublication(filter, {
				projection: { title: 1, description: 1, completed: 1, createdAt: 1, updatedAt: 1, owner: 1, team: 1 }
			});
		});

		this.addTransformedPublication('todoTransformedList', (filter = {}) => {
			return this.defaultListCollectionPublication(filter, {
				projection: { title: 1, description: 1, completed: 1, createdAt: 1, updatedAt: 1, owner: 1, team: 1 }
			});
		}, (doc: ITodo) => {
			/// opera em cima do que foi publicado (ex: procurar o usuário pelo id e colocar o objeto)
			return {
				...doc,
				title: doc.title.toUpperCase()
			};
		});

		this.initSeedData();

	}


	async initSeedData(): Promise<void> {
		const count = await this.collectionInstance.find().countAsync();

		if (count === 0) {
			const initTodos = Array.from({ length: 20 }, (_, i) => ({
				title: `Todo ${i + 1}`,
				description: `Description ${i + 1}`,
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date(),
				owner: 'owner 1',
				team: 'team 1'
			}));

			initTodos.forEach(todo => this.collectionInstance.insertAsync(todo));
		}
	}
}

export const todoServerApi = new TodoServerApi();
