// region Imports
import { Email } from 'meteor/email';
import { buildTaskCreatedEmail } from '../../email/templates/buildTaskCreatedEmail';
import { buildTaskUpdatedEmail } from '../../email/templates/taskUpdatedEmail';
import { INotification } from '../../notification/api/notificationSch';
import { notificationServerApi } from '../../notification/api/notificationServerApi';
import { Recurso } from '../config/recursos';
import { ITodo, todoSch } from './todoSch';
import { ProductServerBase } from '/imports/api/productServerBase';
import { userprofileServerApi } from '/imports/modules/userprofile/api/userProfileServerApi';
import { IContext } from '/imports/typings/IContext';

// endregion

export class TodoServerApi extends ProductServerBase<ITodo> {
	constructor() {
		super('todo', todoSch, { resources: Recurso });
		this.afterUpdate = this.afterUpdate.bind(this);
		this.beforeInsert = this.beforeInsert.bind(this);

		this.addTransformedPublication(
			'todoList',
			(filter = {}) => {
				return this.collectionInstance.find(filter, {
					fields: { title: 1, description: 1, completed: 1, createdAt: 1, updatedAt: 1, owner: 1, team: 1, assignee: 1, createdat: 1, assignee_teste: 1 }
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




	async afterRemove(_docObj: any, _context: IContext): Promise<any> {

		await notificationServerApi.getCollectionInstance().insertAsync({
			title: `Tarefa deletada: ${_docObj.title}`,
			message: _docObj.description,
			recipientId: _docObj.assignee,
			senderId: _docObj.owner,
			createdAt: new Date(),
			type: "TASK_DELETED",
			read: false
		} as INotification, () => { });

		return true;
	}

	async afterUpdate(docObj: ITodo, context: IContext): Promise<void> {

		const assigneeProfileDoc =
			await userprofileServerApi
				.getCollectionInstance()
				.findOneAsync({ _id: docObj.assignee });

		if (assigneeProfileDoc?.email) {
			Email.sendAsync({
				to: assigneeProfileDoc.email,
				from: "Meu App <no-reply@todoApp.com>",
				...buildTaskUpdatedEmail(docObj)
			});
		}

		await notificationServerApi.getCollectionInstance().insertAsync({
			title: `Tarefa atualizada: ${docObj.title}`,
			message: docObj.description,
			recipientId: docObj.assignee,
			senderId: docObj.owner,
			createdAt: new Date(),
			type: "TASK_UPDATED",
			read: false
		} as INotification, () => { });


	}

	async beforeInsert(_docObj: ITodo | Partial<ITodo>, _context: IContext) {

		console.log(
			_docObj, "< == beforeInsert"
		);

		const result = await super.beforeInsert(_docObj, _context);

		if (!result) return false;

		_docObj.assignee = _docObj.assignee || _context.user._id;
		_docObj.owner = _context.user._id;

		console.log(
			_docObj, "< == beforeInsert"
		);

		return true;
	}

	async afterInsert(docObj: ITodo, _context: IContext) {
		const assigneeProfileDoc =
			await userprofileServerApi
				.getCollectionInstance()
				.findOneAsync({ _id: docObj.assignee });


		if (assigneeProfileDoc?.email) {
			Email.sendAsync({
				to: assigneeProfileDoc.email,
				from: "Meu App <no-reply@todoApp.com>",
				...buildTaskCreatedEmail(docObj)
			});
		}

		await notificationServerApi.getCollectionInstance().insertAsync({
			title: `Nova tarefa: ${docObj.title}`,
			message: docObj.description,
			recipientId: docObj.assignee,
			senderId: docObj.owner,
			createdAt: new Date(),
			type: 'TASK_ASSIGNED',
			read: false
		} as INotification, () => { });
	}



}





export const todoServerApi = new TodoServerApi();


