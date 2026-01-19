import { Typography } from "@mui/material";
import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import TodoItem from '../../components/todoItem';
import { TodoListControllerContext } from './todoListController';
import styles from './todoListStyles';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';


const TodoListView: React.FC = () => {
    const navigate = useNavigate();
    const { user, todos, loading, ...controller } = useContext(TodoListControllerContext);

    const userName = user?.username || 'Usuário';


    return (
        <styles.Container>
            <styles.HeaderContainer>
                <styles.HeaderTitle>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Olá, {userName}
                    </Typography>
                </styles.HeaderTitle>
                <styles.HeaderSubtitle>
                    <Typography variant="body1">
                        Seus projetos muito mais organizados. Veja as tarefas adicionadas por seu time, por você e para você!
                    </Typography>
                </styles.HeaderSubtitle>
            </styles.HeaderContainer>
            <styles.SectionTitle>
                Adicionadas Recentemente
            </styles.SectionTitle>

            <styles.ListContainer>
                {todos.map(todo => (
                    <TodoItem
                        key={todo._id}
                        title={todo.title}
                        createdBy={todo.owner_data?.username || ''}
                        isCompleted={todo.completed === 'completed'}
                        isOwner={todo.isOwner}
                        onToggle={() => controller.onChangeCompleted(todo._id, todo.completed === 'completed' ? 'pending' : 'completed')}
                        onClick={() => { controller.onShowDetailTodo(todo._id) }}
                        onEdit={() => { controller.onEditTodo(todo._id) }}
                        onDelete={() => { controller.onDeleteTodo(todo._id) }}
                    />
                ))}
            </styles.ListContainer>
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
        </styles.Container>
    );
};

export default TodoListView;
