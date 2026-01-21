import React, { createContext, RefObject } from 'react';
import { ISysMenuItem, ISysMenuRef } from '/imports/ui/components/sysMenu/sysMenuProvider';

interface ISysAppBarContext {
    userName: string;
    menuPerfilRef: RefObject<ISysMenuRef>;
    menuMobileRef: RefObject<ISysMenuRef>;
    onClickLogo: () => void;
    abrirMenuPerfil: (event: React.MouseEvent<HTMLElement>) => void;
    abrirMenuMobile: (event: React.MouseEvent<HTMLElement>) => void;
    getOpcoesMenuDeUsuario: () => Array<ISysMenuItem>;
    notificationAnchorEl: null | HTMLElement;
    handleOpenNotifications: (event: React.MouseEvent<HTMLElement>) => void;
    handleCloseNotifications: () => void;
    notifications: Array<{ id: string; title: string; read: boolean }>;
}

const SysAppBarContext = createContext<ISysAppBarContext>({} as ISysAppBarContext);
export default SysAppBarContext;
export type { ISysAppBarContext };
