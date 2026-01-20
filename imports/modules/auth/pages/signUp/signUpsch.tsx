import { validarEmail } from "/imports/libs/validaEmail";
import { IDoc } from "/imports/typings/IDoc";
import { ISchema } from "/imports/typings/ISchema";


export const signUpSchema: ISchema<ISignUp> = {
	user: {
		type: 'String',
		label: 'Usuário',
		optional: false,
		defaultValue: 'admin@mrb.com',
		validationFunction: (value: string) => {
			if (value.includes(' ')) return 'Usuário não pode conter espaços';
			return undefined;
		}
	},
	email: {
		type: 'String',
		label: 'Email',
		optional: false,
		defaultValue: 'admin@mrb.com',
		validationFunction: (value: string) => {
			if (!value) return undefined;
			const email = validarEmail(value);
			if (!email) return 'Email inválido';
			return undefined;
		}
	},
	password: {
		type: 'String',
		label: 'Senha',
		optional: false,
		defaultValue: 'admin@mrb.com'
	},
	confirmPassword: {
		type: 'String',
		label: 'Confirmar Senha',
		optional: false,
		defaultValue: 'admin@mrb.com'
	}
};

export interface ISignUp extends IDoc {
	user: string;
	email: string;
	password: string;
	confirmPassword: string;
}
