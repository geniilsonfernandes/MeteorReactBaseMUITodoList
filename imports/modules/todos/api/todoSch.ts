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
		optional: false
	},
	completed: {
		type: [String],
		label: 'Concluído',
		defaultValue: 'pendente',
		optional: true,
		options: () => [
			{
				value: 'concluido',
				label: 'Concluído'
			},
			{
				value: 'pendente',
				label: 'Pendente'
			},
			{
				value: 'cancelado',
				label: 'Cancelado'
			}
		]
	},
	assignee: {
		type: String,
		label: 'Designado a',
		optional: true
	},
	owner: {
		type: String,
		label: 'Dono',
		optional: true
	}

};

export interface ITodo extends IDoc {
	title: string;
	description: string;
	completed: boolean;
	createdAt: Date;
	updatedAt: Date;
	owner: string;
	assignee: string;
	team: string;
}
