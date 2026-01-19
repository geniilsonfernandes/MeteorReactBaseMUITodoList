import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, Checkbox, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import TodoItemMenu from './TodoItemMenu';

interface ITodoItemProps {
    title: string;
    createdBy: string;
    isCompleted: boolean;
    onToggle?: () => void;
    onClick?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    isOwner?: boolean;
}

const ItemContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: '100%',
    '&:last-child': {
        borderBottom: 'none',
    },
    '&:hover': {
        backgroundColor: theme.palette.grey[100],
    },
    cursor: 'pointer',
}));

const TextContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginLeft: theme.spacing(2),
}));

const Title = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'isCompleted',
})<{ isCompleted: boolean }>(({ theme, isCompleted }) => ({
    fontWeight: 500,
    textDecoration: isCompleted ? 'line-through' : 'none',
    color: isCompleted ? theme.palette.text.secondary : theme.palette.text.primary,
}));

const Subtitle = styled(Typography)(({ theme }) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
}));

const TodoItem: React.FC<ITodoItemProps> = ({ title, createdBy, isCompleted, onToggle, onClick, onEdit, onDelete, isOwner }) => {

    const handleEdit = () => {
        if (onEdit) onEdit();
    };

    const handleDelete = () => {
        if (onDelete) onDelete();
    };

    return (
        <ItemContainer
            onClick={onClick}
            sx={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                onClick={(e) => e.stopPropagation()}
                checked={isCompleted}
                disabled={!isOwner}
                onChange={(e) => {
                    e.stopPropagation();
                    if (onToggle) onToggle();
                }}
                sx={{ p: 0 }}
                size='large'
            />
            <TextContainer>
                <Title variant="body1" isCompleted={isCompleted}>
                    {title}
                </Title>
                <Subtitle>
                    Criada por: <Box component="span" sx={{ textDecoration: 'underline' }}>{createdBy}</Box>
                </Subtitle>
            </TextContainer>
            <TodoItemMenu onEdit={isOwner ? handleEdit : undefined} onDelete={isOwner ? handleDelete : undefined} />

        </ItemContainer>
    );
};

export default TodoItem;
