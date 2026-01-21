import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditNotificationsIcon from "@mui/icons-material/EditNotifications";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";

type NotificationType =
    | "TASK_ASSIGNED"
    | "TASK_UPDATED"
    | "TASK_DELETED"
    | "SYSTEM";

interface NotificationItemProps {
    notification: {
        _id?: string;
        title: string;
        read: boolean;
        type: NotificationType;
    };
    onRead: (id: string) => void;
    onDelete: (id: string) => void;
}

const typeStyleMap: Record<
    NotificationType,
    {
        color: string;
        bg: string;
        icon: React.ReactNode;
        label: string;
    }
> = {
    TASK_ASSIGNED: {
        color: "#1976d2",
        bg: "rgba(25, 118, 210, 0.08)",
        icon: <AssignmentIndIcon />,
        label: "Tarefa atribuída"
    },
    TASK_UPDATED: {
        color: "#9c27b0",
        bg: "rgba(156, 39, 176, 0.08)",
        icon: <EditNotificationsIcon />,
        label: "Tarefa atualizada"
    },
    TASK_DELETED: {
        color: "#d32f2f",
        bg: "rgba(211, 47, 47, 0.08)",
        icon: <DeleteSweepIcon />,
        label: "Tarefa removida"
    },
    SYSTEM: {
        color: "#0288d1",
        bg: "rgba(2, 136, 209, 0.08)",
        icon: <SettingsSuggestIcon />,
        label: "Sistema"
    }
};

const NotificationItem: React.FC<NotificationItemProps> = ({
    notification,
    onRead,
    onDelete
}) => {
    const style = typeStyleMap[notification.type];

    return (
        <Paper
            elevation={0}
            onClick={() => onRead(notification._id || "")}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1.5,
                mb: 1,
                borderRadius: 2,
                cursor: "pointer",
                bgcolor: notification.read ? "background.paper" : style.bg,
                border: `1px solid ${notification.read ? "transparent" : style.color + "33"}`,
                transition: "0.2s",
                "&:hover": {
                    bgcolor: style.bg
                }
            }}
        >
            {/* Icon */}
            <Box sx={{ color: style.color }}>
                {style.icon}
            </Box>

            {/* Text */}
            <Box sx={{ flex: 1 }}>
                <Typography
                    fontSize={14}
                    fontWeight={notification.read ? 400 : 600}
                >
                    {notification.title}
                </Typography>
                <Typography fontSize={12} color="text.secondary">
                    {style.label} • {notification.read ? "Lida" : "Não lida"}
                </Typography>
            </Box>

            {/* Delete button */}
            <IconButton
                size="small"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(notification._id || "");
                }}
            >
                <SysIcon name="delete" />
            </IconButton>
        </Paper>
    );
}

export default NotificationItem;
