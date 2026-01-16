// region Imports
import { ITodo, todoSch } from './todoSch';
import { ProductBase } from '/imports/api/productBase';

class TodoApi extends ProductBase<ITodo> {
    constructor() {
        super('todo', todoSch, {
            enableCallMethodObserver: true,
            enableSubscribeObserver: true
        });
    }
}

export const todoApi = new TodoApi();

    