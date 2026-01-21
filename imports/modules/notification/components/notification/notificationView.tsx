import { Box, IconButton, List, ListItem, ListItemText, Popover } from "@mui/material";
import React from "react";
import { NotificationControllerContext } from "./notificationController";

import { Badge } from "@mui/material";
import NotificationItem from "../notificationItem/notificationItem";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";

const NotificationView: React.FC = () => {
    const controller = React.useContext(NotificationControllerContext);

    const open = Boolean(controller.notificationAnchorEl);
    const id = open ? 'simple-popover' : undefined;




    return (
        <>
            <IconButton color="inherit" onClick={controller.handleOpenNotifications}>
                <Badge badgeContent={controller.notifications?.length} color="error">
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
                <Box sx={{ width: 400, maxHeight: 400, overflow: 'auto' }}>
                    <List sx={{ p: 1 }}>
                        {controller.notifications?.length === 0 ? (
                            <ListItem>
                                <ListItemText primary="Nenhuma notificação" />
                            </ListItem>
                        ) : (
                            controller.notifications?.map((notification, index) => (
                                <NotificationItem
                                    key={notification._id}
                                    notification={notification}
                                    onRead={controller.markNotificationAsRead}
                                    onDelete={() => controller.markNotificationAsRead(notification._id || "")}
                                />
                            ))
                        )}
                    </List>
                </Box>
            </Popover>
        </>
    );
};

export default NotificationView;