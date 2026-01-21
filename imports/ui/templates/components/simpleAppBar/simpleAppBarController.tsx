import React, { useCallback, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Context, { ISysAppBarContext } from './simpleAppBarContext';
import SimpleAppBarView from './simpleAppBarView';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import AuthContext from '/imports/app/authProvider/authContext';
import SysAvatar from '/imports/ui/components/sysAvatar/sysAvatar';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { ISysMenuItem, ISysMenuRef } from '/imports/ui/components/sysMenu/sysMenuProvider';


interface ISimpleAppBarController {
}

const SimpleAppBarController: React.FC<ISimpleAppBarController> = ({
}) => {
    const { user, isLoggedIn, logout } = useContext(AuthContext);
    const { showModal } = useContext(AppLayoutContext);

    const navigate = useNavigate();
    const menuPerfilRef = useRef<ISysMenuRef>(null);
    const menuMobileRef = useRef<ISysMenuRef>(null);

    const onClickLogo = useCallback((): void => navigate('/'), [navigate]);
    
    const onLogout = useCallback(async (): Promise<void> => { 
        logout(() => navigate('/'));
    }, [navigate]);
    
    const abrirMenuPerfil = useCallback((event: React.MouseEvent<HTMLElement>): void => { 
        menuPerfilRef.current?.openMenu(event)
    }, [menuPerfilRef]);
    
    const abrirMenuMobile = useCallback((event: React.MouseEvent<HTMLElement>): void => {
        menuMobileRef.current?.openMenu(event)
    }, [menuMobileRef]);

    const getOpcoesMenuDeUsuario = useCallback((): Array<ISysMenuItem> => ([
        {
            key: 'perfil',
            // onClick: () => showUserProfileDetailControllerModal(showModal, {}),
            otherProps: {  label: user?.username || '-',  startIcon: (<SysAvatar name={user?.username}/>)},
        },
        {
            key: 'sair',
            onClick: onLogout,
            otherProps: { label: 'Sair', startIcon: (<SysIcon name='logout'/>)}
        }
    ]), [user, showModal, onLogout]);

    



    const providerValue: ISysAppBarContext = {
        userName: user?.username || '-',
        menuPerfilRef,
        menuMobileRef,
        onClickLogo,
        abrirMenuPerfil,
        abrirMenuMobile,
        getOpcoesMenuDeUsuario,
    };

    return (
        <Context.Provider value={providerValue}>
            <SimpleAppBarView  />
        </Context.Provider>
    )
};

export default SimpleAppBarController;