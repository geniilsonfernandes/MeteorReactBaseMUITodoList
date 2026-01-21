import { IUserProfile } from '../../userprofile/api/userProfileSch';
import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';


export const completedOptions = {
	pending: {
		label: 'Pendente',
		value: 'pending'
	},
	completed: {
		label: 'Concluído',
		value: 'completed'
	},
	canceled: {
		label: 'Cancelado',
		value: 'canceled'
	}
}

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
	isCompleted: {
		type: Boolean,
		label: 'Concluído',
		defaultValue: false,
		optional: true
	},
	completed: {
		type: String,
		label: 'Concluído',
		defaultValue: completedOptions.pending.label,
		optional: true,
		options: () => [
			completedOptions.completed,
			completedOptions.pending,
			completedOptions.canceled
		]
	},
	assignee: {
		type: String,
		label: 'Designado a',
		optional: true,
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
	completed: string;
	createdAt: Date;
	updatedAt: Date;
	owner?: string;
	assignee?: string;
	team?: string;
	isCompleted: boolean;

	//
	owner_data?: IUserProfile;
	assignee_data?: IUserProfile;
	isOwner?: boolean;
}
