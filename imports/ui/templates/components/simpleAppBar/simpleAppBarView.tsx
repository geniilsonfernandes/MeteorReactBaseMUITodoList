import { Badge, Box, Divider, IconButton, List, ListItem, ListItemText, Popover, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import Context, { ISysAppBarContext } from './simpleAppBarContext';
import Styles from './simpleAppBarStyles';
import SysAvatar from '/imports/ui/components/sysAvatar/sysAvatar';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import SysMenu from '/imports/ui/components/sysMenu/sysMenuProvider';

const SimpleAppBarView: React.FC = () => {
  const controller = useContext<ISysAppBarContext>(Context);

  const open = Boolean(controller.notificationAnchorEl);
  const id = open ? 'simple-popover' : undefined;

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
          <IconButton color="inherit" onClick={controller.handleOpenNotifications}>
            <Badge badgeContent={controller.notifications?.filter(n => !n.read).length} color="error">
              <SysIcon name="notification" />
            </Badge>
          </IconButton>
          <Popover

            id={id}
            open={open}
            anchorEl={controller.notificationAnchorEl}
            onClose={controller.handleCloseNotifications}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box sx={{ width: 300, maxHeight: 400, overflow: 'auto' }}>
              <List>
                {controller.notifications?.length === 0 ? (
                  <ListItem>
                    <ListItemText primary="No notifications" />
                  </ListItem>
                ) : (
                  controller.notifications?.map((notification, index) => (
                    <React.Fragment key={notification.id}>
                      <ListItem alignItems="flex-start" sx={{ bgcolor: notification.read ? 'inherit' : 'action.hover' }}>
                        <ListItemText
                          primary={notification.title}
                          secondary={notification.read ? 'Read' : 'Unread'}
                        />
                      </ListItem>
                      {index < controller.notifications.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                  ))
                )}
              </List>
            </Box>
          </Popover>

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