// region Imports
import { Recurso } from '../config/recursos';
import { ITodo, todoSch } from './todoSch';
import { ProductServerBase } from '/imports/api/productServerBase';
import { userprofileServerApi } from '/imports/modules/userprofile/api/userProfileServerApi';
import { IContext } from '/imports/typings/IContext';

// endregion

class TodoServerApi extends ProductServerBase<ITodo> {
	constructor() {
		super('todo', todoSch, { resources: Recurso });

		this.addTransformedPublication(
			'todoList',
			(filter = {}) => {
				return this.collectionInstance.find(filter, {
					fields: { title: 1, description: 1, completed: 1, createdAt: 1, updatedAt: 1, owner: 1, team: 1, assignee: 1, createdat: 1 }
				});
			},
			async (doc: ITodo) => {
				const userProfileDoc = await userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.owner });
				const assigneeProfileDoc = await userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.assignee });

				const userId = await Meteor.userId();
				return {
					...doc,
					owner_data: userProfileDoc,
					assignee_data: assigneeProfileDoc,
					isOwner: doc.owner === userId
				};
			}
		);

		this.addTransformedPublication('todoDetail', (filter = {}) => {
			return this.defaultDetailCollectionPublication(filter, {});
		}, async (doc: ITodo) => {
			const userProfileDoc = await userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.owner });
			const assigneeProfileDoc = await userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.assignee });

			const userId = await Meteor.userId();
			return {
				...doc,
				owner_data: userProfileDoc,
				assignee_data: assigneeProfileDoc,
				isOwner: doc.owner === userId
			};
		});





		// this.addTransformedPublication('todoTransformedList', (filter = {}) => {
		// 	return this.defaultListCollectionPublication(filter, {
		// 		projection: { title: 1, description: 1, completed: 1, createdAt: 1, updatedAt: 1, owner: 1, team: 1 }
		// 	});
		// }, (doc: ITodo) => {
		// 	/// opera em cima do que foi publicado (ex: procurar o usuário pelo id e colocar o objeto)
		// 	return {
		// 		...doc,
		// 		title: doc.title.toUpperCase()
		// 	};
		// });



		this.initSeedData();

	}




	async beforeInsert(_docObj: ITodo | Partial<ITodo>, _context: IContext) {
		const result = await super.beforeInsert(_docObj, _context);
		if (!result) return false;

		_docObj.assignee = _context.user._id;
		_docObj.owner = _context.user._id;



		return true;
	}

	async initSeedData(): Promise<void> {
		const count = await this.collectionInstance.find().countAsync();

		if (count === 0) {
			const initTodos = Array.from({ length: 20 }, (_, i) => ({
				title: `Todo ${i + 1}`,
				description: `Description ${i + 1}`,
				completed: 'pendente',
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
