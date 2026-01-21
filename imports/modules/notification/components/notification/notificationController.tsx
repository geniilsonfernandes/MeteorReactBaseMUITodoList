import { useTracker } from "meteor/react-meteor-data";
import React, { useCallback, useContext } from "react";
import { notificationApi } from "../../api/notificationApi";
import { INotification } from "../../api/notificationSch";
import NotificationView from "./notificationView";
import AppLayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";
import AuthContext, { IAuthContext } from "/imports/app/authProvider/authContext";
import { IMeteorError } from "/imports/typings/IMeteorError";

export interface INotificationControllerContext {
    loading: boolean;
    notifications: INotification[];
    notificationAnchorEl: null | HTMLElement;

    handleOpenNotifications: (event: React.MouseEvent<HTMLElement>) => void;
    handleCloseNotifications: () => void;
    markNotificationAsRead: (notificationId: string) => void;

}

interface INotificationController {
}

export const NotificationControllerContext = React.createContext<INotificationControllerContext>(
    {} as INotificationControllerContext
);

const NotificationController: React.FC<INotificationController> = () => {
    const { user } = useContext<IAuthContext>(AuthContext);
    const { showNotification } = useContext<IAppLayoutContext>(AppLayoutContext);


    const { loading, notifications } = useTracker(() => {
        const filter = {
            recipientId: user?._id,
            read: false
        };


        const subHandle = notificationApi.subscribe('notificationList', filter);

        if (!subHandle?.ready()) {
            return {
                loading: true,
                notifications: []
            };
        }

        const notifications = notificationApi.find(filter).fetch();

        return {
            notifications: notifications as INotification[],
            loading: false
        };
    }, []);



    const markNotificationAsRead = useCallback((notificationId: string) => {
        const notificationFound = notificationApi.findOne(notificationId);
        if (!notificationFound) {
            return;
        }
        notificationFound.read = true;
        notificationApi.update(notificationFound, (e: IMeteorError) => {
            if (e) {
                showNotification({
                    message: e.message,
                    type: 'error'
                });
                return;
            }
        });
    }, []);








    const [notificationAnchorEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleCloseNotifications = () => {
        setNotificationAnchorEl(null);
    };





    return (
        <NotificationControllerContext.Provider value={{
            loading,
            notifications,
            notificationAnchorEl,
            handleOpenNotifications,
            handleCloseNotifications,
            markNotificationAsRead
        }}>
            <NotificationView />
        </NotificationControllerContext.Provider>
    );
};

export default NotificationController;
