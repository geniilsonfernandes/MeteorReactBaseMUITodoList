import { Typography } from "@mui/material";
import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import TodoItem from '../../components/todoItem';
import { TodoListControllerContext } from './todoListController';
import TodoListStyles from './todoListStyles';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

const mockTodosData = [
    { id: '1', title: 'Elaborar roteiro do grupo focal', createdBy: 'Você', isCompleted: false },
    { id: '2', title: 'Realizar atividade', createdBy: 'Você', isCompleted: false },
    { id: '3', title: 'Fazer reunião de alinhamento', createdBy: 'Jonathan Smith', isCompleted: true },
    { id: '4', title: 'Definir prazos', createdBy: 'Jane Doe', isCompleted: true },
    { id: '5', title: 'Definir prazos', createdBy: 'Jane Doe', isCompleted: true },
    { id: '6', title: 'Definir prazos', createdBy: 'Jane Doe', isCompleted: true },
];

const TodoListView: React.FC = () => {
    const navigate = useNavigate();
    const { user, todos, loading } = useContext(TodoListControllerContext);
    const { Container, HeaderContainer, HeaderTitle, HeaderSubtitle, SectionTitle, ListContainer } = TodoListStyles;



    const userName = user?.username || 'Usuário';


    return (
        <Container>
            <HeaderContainer>
                <HeaderTitle>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Olá, {userName}
                    </Typography>
                </HeaderTitle>
                <HeaderSubtitle>
                    <Typography variant="body1">
                        Seus projetos muito mais organizados. Veja as tarefas adicionadas por seu time, por você e para você!
                    </Typography>
                </HeaderSubtitle>
            </HeaderContainer>
            <SectionTitle>
                Adicionadas Recentemente
            </SectionTitle>

            <ListContainer>
                {todos.map(todo => (
                    <TodoItem
                        key={todo._id}
                        title={todo.title}
                        createdBy={todo.owner}
                        isCompleted={todo.completed}
                        onClick={() => navigate(`/todos/detail/${todo._id}`)}
                        onToggle={() => { }}
                        onEdit={() => { }}
                        onDelete={() => { }}
                    />
                ))}
            </ListContainer>
            <SysFab
                variant="extended"
                text="Ir para tarefas"
                size="small"
                onClick={() => navigate('/todos/list')}
                endIcon={<SysIcon name={'chevronRight'} />}
                sx={{
                    position: 'fixed',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bottom: '32px',
                    zIndex: 1000
                }}
            />
        </Container>
    );
};

export default TodoListView;
