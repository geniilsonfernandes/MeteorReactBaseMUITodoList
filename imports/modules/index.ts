import { IAppMenu, IModuleHub, IRoute } from './modulesTypings';
import Aniversario from './aniversario/config';
import UserProfile from './userprofile/config';
import Todos from './todos/config';

/// onde configura as rotas
const pages: Array<IRoute | null> = [
	...Todos.pagesRouterList,
	...Aniversario.pagesRouterList, 
	...UserProfile.pagesRouterList,
];

/// onde configura os menus
const menuItens: Array<IAppMenu | null> = [
	...Todos.pagesMenuItemList,
	...Aniversario.pagesMenuItemList,
	...UserProfile.pagesMenuItemList,
];


console.log(menuItens);
console.log(pages);

/// onde configura os menus
const Modules: IModuleHub = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
