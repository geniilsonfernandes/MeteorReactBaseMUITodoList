import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';

export const todoSch: ISchema<ITodo> = {
	title: {
		type: String,
		label: 'Título',
		optional: false
	},
	description: {
		type: String,
		label: 'Descrição',
		optional: true
	},
	completed: {
		type: Boolean,
		label: 'Concluído',
		optional: false,
		defaultValue: false
	},
	createdAt: {
		type: Date,
		label: 'Data de criação',
		optional: false,
		defaultValue: new Date()
	},
	updatedAt: {
		type: Date,
		label: 'Data de atualização',
		optional: false,
		defaultValue: new Date()
	},
	owner: {
		type: String,
		label: 'Dono',
		optional: false
	},
	team: {
		type: String,
		label: 'Time',
		optional: false
	}
};

export interface ITodo extends IDoc {
	title: string;
	description: string;
	completed: boolean;
	createdAt: Date;
	updatedAt: Date;
	owner: string;
	team: string;

}
