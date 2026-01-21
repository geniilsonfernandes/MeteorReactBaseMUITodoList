// region Imports
import { INotification, notificationSch } from './notificationSch';
import { ProductBase } from '/imports/api/productBase';

class NotificationApi extends ProductBase<INotification> {
    constructor() {
        super('notification', notificationSch, {
            enableCallMethodObserver: true,
            enableSubscribeObserver: true
        });
    }
}

export const notificationApi = new NotificationApi();

    