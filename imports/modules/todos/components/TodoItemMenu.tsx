import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';

interface ITodoItemMenuProps {
    onEdit?: () => void;
    onDelete?: () => void;
}

const TodoItemMenu: React.FC<ITodoItemMenuProps> = ({ onEdit, onDelete }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event?: React.MouseEvent) => {
        if (event) event.stopPropagation();
        setAnchorEl(null);
    };

    const handleEdit = (event: React.MouseEvent) => {
        handleClose(event);
        onEdit?.();
    };

    const handleDelete = (event: React.MouseEvent) => {
        handleClose(event);
        onDelete?.();
    };

    return (
        <>
            <IconButton edge="end" onClick={handleOpen}>
                <MoreVertIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose()}
                onClick={(e) => e.stopPropagation()}
            >
                <MenuItem onClick={handleEdit}>Editar</MenuItem>
                <MenuItem onClick={handleDelete}>Excluir</MenuItem>
            </Menu>
        </>
    );
};

export default TodoItemMenu;