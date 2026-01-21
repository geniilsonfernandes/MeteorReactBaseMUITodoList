// region Imports
import { Email } from 'meteor/email';
import { buildTaskCreatedEmail } from '../../email/templates/buildTaskCreatedEmail';
import { buildTaskUpdatedEmail } from '../../email/templates/taskUpdatedEmail';
import { Recurso } from '../config/recursos';
import { ITodo, todoSch } from './todoSch';
import { ProductServerBase } from '/imports/api/productServerBase';
import { userprofileServerApi } from '/imports/modules/userprofile/api/userProfileServerApi';
import { IContext } from '/imports/typings/IContext';

// endregion

class TodoServerApi extends ProductServerBase<ITodo> {
	constructor() {
		super('todo', todoSch, { resources: Recurso });
		this.afterUpdate = this.afterUpdate.bind(this);
		this.beforeInsert = this.beforeInsert.bind(this);

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
					isOwner: doc.owner === userId || doc.assignee === userId
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
				isOwner: doc.owner === userId || doc.assignee === userId
			};
		});
	}





	async afterUpdate(docObj: ITodo, context: IContext): Promise<void> {
		try {
			const assigneeProfileDoc =
				await userprofileServerApi
					.getCollectionInstance()
					.findOneAsync({ _id: docObj.assignee });

			if (assigneeProfileDoc?.email) {
				Email.send({
					to: assigneeProfileDoc.email,
					from: "Meu App <no-reply@todoApp.com>",
					...buildTaskUpdatedEmail(docObj)
				});
			}
		} catch (error) {
			console.error("Error sending notification email:", error);
		}
	}

	async beforeInsert(_docObj: ITodo | Partial<ITodo>, _context: IContext) {
		const result = await super.beforeInsert(_docObj, _context);

		if (!result) return false;

		_docObj.assignee = _docObj.assignee || _context.user._id;
		_docObj.owner = _context.user._id;


		return true;
	}

	async afterInsert(docObj: ITodo, _context: IContext) {
		const assigneeProfileDoc =
			await userprofileServerApi
				.getCollectionInstance()
				.findOneAsync({ _id: docObj.assignee });


		if (assigneeProfileDoc?.email) {
			Email.send({
				to: assigneeProfileDoc.email,
				from: "Meu App <no-reply@todoApp.com>",
				...buildTaskCreatedEmail(docObj)
			});
		}
	}


}



// cria um seed com 3 todos exemplo

export const todoServerApi = new TodoServerApi();


