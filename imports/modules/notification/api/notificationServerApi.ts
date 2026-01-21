// region Imports
import { Recurso } from '../config/recursos';
import { INotification, notificationSch } from './notificationSch';
import { ProductServerBase } from '/imports/api/productServerBase';

// endregion

class NotificationServerApi extends ProductServerBase<INotification> {
	constructor() {
		super('notification', notificationSch, { resources: Recurso });
		this.afterUpdate = this.afterUpdate.bind(this);
		this.beforeInsert = this.beforeInsert.bind(this);

		this.addPublication('notificationList', (filter = {}) => {
			console.log(filter, 'filter');
			return this.collectionInstance.find(filter);
		});
	}
}

export const notificationServerApi = new NotificationServerApi();


