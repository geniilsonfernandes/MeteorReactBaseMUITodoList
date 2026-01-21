import { Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import Context, { ISysAppBarContext } from './simpleAppBarContext';
import Styles from './simpleAppBarStyles';
import NotificationController from '/imports/modules/notification/components/notification/notificationController';
import SysAvatar from '/imports/ui/components/sysAvatar/sysAvatar';
import SysMenu from '/imports/ui/components/sysMenu/sysMenuProvider';

const SimpleAppBarView: React.FC = () => {
  const controller = useContext<ISysAppBarContext>(Context);



  return (
    <Styles.wrapper>
      <Styles.container>
        <Stack direction="row" alignItems="center">
          <Typography component="span" variant="h6" sx={{ fontWeight: 'bold' }}>
            Todo
          </Typography>
          <Typography component="span" variant="h6" sx={{ fontWeight: 'normal' }}>
            List
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={4}>

          <NotificationController />

          <SysAvatar
            activateOutline
            size='large'
            name={controller.userName}
            onClick={(event) => controller.menuPerfilRef.current?.openMenu(event)}
          />
          <SysMenu
            ref={controller.menuPerfilRef}
            activeArrow
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            options={controller.getOpcoesMenuDeUsuario()}
          />
        </Stack>
      </Styles.container>
    </Styles.wrapper>
  );
};

export default SimpleAppBarView;