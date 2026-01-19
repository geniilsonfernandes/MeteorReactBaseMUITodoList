import { Box, Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useContext } from "react";
import TodoItem from '../../components/todoItem';
import { IUserTodoListControllerContext, UserTodoListControllerContext, UserTodoListTab } from './userTodoListController';
import UserTodoListStyles from './userTodoListStyles';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { SysTabs } from '/imports/ui/components/sysTabs/sysTabs';

const mockTodosData = [
    { id: '1', title: 'Elaborar roteiro do grupo focal', createdBy: 'Você', isCompleted: false },
    { id: '2', title: 'Realizar atividade', createdBy: 'Você', isCompleted: false },
    { id: '3', title: 'Fazer reunião de alinhamento', createdBy: 'Jonathan Smith', isCompleted: true },
    { id: '4', title: 'Definir prazos', createdBy: 'Jane Doe', isCompleted: true },
    { id: '5', title: 'Definir prazos', createdBy: 'Jane Doe', isCompleted: true },
    { id: '6', title: 'Definir prazos', createdBy: 'Jane Doe', isCompleted: true },
];


type ExpandedType = {
    pendingTodos: boolean,
    completedTodos: boolean
}

const UserTodoListView: React.FC = () => {
    const { todos, loading, ...controller } = useContext<IUserTodoListControllerContext>(UserTodoListControllerContext);
    const { Container, Header, AccordionHeader, AccordionTitle, AccordionPanel, } = UserTodoListStyles;

    const completedTodos = React.useMemo(() => todos.filter(todo => todo.completed === 'completed'), [todos]);
    const pendingTodos = React.useMemo(() => todos.filter(todo => todo.completed === 'pending'), [todos]);

    const [expanded, setExpanded] = React.useState<ExpandedType>({
        pendingTodos: true,
        completedTodos: false
    });

    const toggleAccordion = (panel: keyof ExpandedType) => {
        setExpanded({
            ...expanded,
            [panel]: !expanded[panel]
        });
    };



    return (
        <Container>
            <Header>
                <IconButton onClick={controller.closePage}>
                    <SysIcon name={'arrowBack'} />
                </IconButton>
            </Header>
            <SysTabs
                sxMap={{
                    container: {
                        width: '100%',
                    }
                }}
                abas={[
                    { label: 'Minhas Tarefas', value: UserTodoListTab.MinhasTarefas },
                    { label: 'Tarefas do Time', value: UserTodoListTab.TarefasDoTime }
                ]}
                value={controller.tabValue}
                handleChange={(_, value) => controller.handleChangeTab(value as UserTodoListTab)}
            />
            <Box
                width={'100%'}
            >
                {loading && <Box>Loading...</Box>}
                {controller.tabValue === UserTodoListTab.MinhasTarefas && (
                    <Box>
                        {pendingTodos.length > 0 ? (
                            <Box>
                                <AccordionHeader onClick={() => toggleAccordion('pendingTodos')}>
                                    <IconButton
                                        sx={{
                                            transform: expanded.pendingTodos ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease-in-out',
                                        }}
                                    >
                                        <SysIcon name={'expandMore'} />
                                    </IconButton>
                                    <AccordionTitle>
                                        Não Concluídas ({pendingTodos.length})
                                    </AccordionTitle>
                                </AccordionHeader>

                                <Collapse in={expanded.pendingTodos} timeout="auto" unmountOnExit>
                                    <AccordionPanel>
                                        {pendingTodos.map((todo) => (
                                            <TodoItem
                                                key={todo._id}
                                                title={todo.title}
                                                createdBy={todo.owner}
                                                isCompleted={todo.completed === 'completed'}
                                                onToggle={() => { }}
                                                onClick={() => controller.onShowDetailTodo(todo._id)}
                                            />
                                        ))}
                                    </AccordionPanel>
                                </Collapse>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    padding: 3,
                                    textAlign: 'left',
                                    color: 'text.secondary'
                                }}
                            >
                                🎉 Nenhuma tarefa pendente!
                                <br />
                                Aproveite o tempo livre ou crie uma nova tarefa.
                            </Box>
                        )}

                        {completedTodos.length > 0 && (
                            <Box sx={{ mt: 4 }}>
                                <AccordionHeader onClick={() => toggleAccordion('completedTodos')}>
                                    <IconButton sx={{
                                        transform: expanded.completedTodos ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s ease-in-out',
                                    }} >
                                        <SysIcon name={'expandMore'} />
                                    </IconButton>
                                    <AccordionTitle>Concluídas ({completedTodos.length})</AccordionTitle>
                                </AccordionHeader>
                                <Collapse in={expanded.completedTodos} timeout="auto" unmountOnExit>
                                    <AccordionPanel>
                                        {completedTodos.map((todo) => (
                                            <TodoItem
                                                key={todo._id}
                                                title={todo.title}
                                                createdBy={todo.owner}
                                                isCompleted={todo.completed === 'completed'}
                                                onToggle={() => { }}
                                                onClick={() => controller.onShowDetailTodo(todo._id)}
                                            />
                                        ))}
                                    </AccordionPanel>
                                </Collapse>
                            </Box>
                        )}
                    </Box>
                )}
                {controller.tabValue === UserTodoListTab.TarefasDoTime && (
                    <Box>
                        tarefas do time
                    </Box>
                )}
            </Box>


            <SysFab
                variant="extended"
                text="Adicionar Tarefa"
                size="small"
                onClick={controller.onNewTodoButtonClick}
                startIcon={<SysIcon name={'add'} />}
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

export default UserTodoListView;