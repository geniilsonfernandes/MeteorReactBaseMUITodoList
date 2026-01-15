// region Imports
import { Recurso } from '../config/recursos';
import { aniversarioSch, IAniversario } from './aniversarioSch';
import { ProductServerBase } from '/imports/api/productServerBase';

// endregion

class AniversarioServerApi extends ProductServerBase<IAniversario> {
	constructor() {
		super('aniversario', aniversarioSch, { resources: Recurso });

		const self = this;

		this.addPublication(
			'aniversarioList',
			(filter = {}) => {
				return this.defaultListCollectionPublication(filter, {
					projection: { name: 1, birthday: 1, phone: 1, remember: 1, delivery: 1 }
				});
			},
		);

		this.addPublication('aniversarioDetail', (filter = {}) => {
			return this.defaultDetailCollectionPublication(filter, {
				projection: { name: 1, birthday: 1, phone: 1, remember: 1, delivery: 1 }
			});
		});


	}
}

export const aniversarioServerApi = new AniversarioServerApi();
