import { IDoc } from "/imports/typings/IDoc";
import { ISchema } from "/imports/typings/ISchema";


export const notificationSch: ISchema<INotification> = {
	title: {
		type: String,
		label: 'Título',
		optional: true
	},
	message: {
		type: String,
		label: 'Mensagem',
		optional: true
	},
	recipientId: {
		type: String,
		label: 'Destinatário',
		optional: true
	},
	senderId: {
		type: String,
		label: 'Remetente',
		optional: true
	},
	type: {
		type: String,
		label: 'Tipo',
		optional: true,
		options: () => [
			{ label: 'Tarefa Atribuída', value: 'TASK_ASSIGNED' },
			{ label: 'Tarefa Atualizada', value: 'TASK_UPDATED' },
			{ label: 'Tarefa Deletada', value: 'TASK_DELETED' },
			{ label: 'Sistema', value: 'SYSTEM' }
		]
	},
	read: {
		type: Boolean,
		label: 'Lida',
		defaultValue: true,
		optional: true
	}
};



export interface INotification extends IDoc {
	title: string;
	message: string;
	recipientId: string;
	senderId?: string; 
	type: 'TASK_ASSIGNED' | 'TASK_UPDATED' | 'TASK_DELETED' | 'SYSTEM'; 
	read: boolean;
}