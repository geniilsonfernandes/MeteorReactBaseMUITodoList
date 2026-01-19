import { debounce } from "lodash";
import { useTracker } from "meteor/react-meteor-data";
import { nanoid } from "nanoid";
import React, { useCallback, useContext, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { todoApi } from "../../api/todoApi";
import { ITodo } from "../../api/todoSch";
import TodoDeleteController from "../todoDelete/todoDeleteController";
import TodoDetailController from "../todoDetail/todoDetailController";
import UserTodoListView from "./userTodoListView";
import AppLayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";
import AuthContext from "/imports/app/authProvider/authContext";
import { IMeteorError } from "/imports/typings/IMeteorError";
import { sysSizing } from "/imports/ui/materialui/styles";


export enum UserTodoListTab {
    MinhasTarefas = 'minhas_tarefas',
    TarefasDoTime = 'tarefas_do_time'
}

export interface IUserTodoListControllerContext {
    // metodos
    closePage: () => void
    handleChangeTab: (newValue: UserTodoListTab) => void
    onCreateTodo: () => void
    closeDialog: () => void
    onShowDetailTodo: (id?: string) => void
    onChangeCompleted: (id: string, completed: "pending" | "completed") => void
    onEditTodo: (id?: string) => void
    onDeleteTodo: (id?: string) => void
    //
    search: string
    handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void

    // states
    tabValue: UserTodoListTab
    todos: ITodo[]
    loading: boolean
}

export const UserTodoListControllerContext = React.createContext<IUserTodoListControllerContext>(
    {} as IUserTodoListControllerContext
);

const UserTodoListController: React.FC = () => {
    const { showDialog, closeDialog, showDrawer, showNotification } = useContext<IAppLayoutContext>(AppLayoutContext);
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const closePage = useCallback(() => navigate(-1), []);

    const [tabValue, setTabValue] = React.useState(UserTodoListTab.MinhasTarefas);
    const [search, setSearch] = React.useState('');

    const handleChangeTab = (newValue: UserTodoListTab) => {
        setTabValue(newValue);
    };

    const handleChangeSearch = React.useMemo(
        () =>
            debounce((e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value);
            }, 500),
        []
    );

    const onCreateTodo = () => {
        showDialog({
            sx: { borderRadius: sysSizing.radiusMd },
            children: <TodoDetailController id={nanoid()} mode="create" component="dialog" />
        });
    };



    const lastTodosRef = useRef<ITodo[]>([]);

    const { loading, todos } = useTracker(() => {
        const filter = {
            owner: user?._id,
            // assignee: user?._id,
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ]
        }
        const subHandle = todoApi.subscribe('todoList', filter);

        if (!subHandle?.ready() || !subHandle) {
            return { loading: true, todos: lastTodosRef.current };
        }

        const data = todoApi.find(filter).fetch();
        lastTodosRef.current = data;

        return { loading: false, todos: data };
    }, [user, search]);


    const onChangeCompleted = useCallback((id: string, completed: "pending" | "completed") => {
        const newDoc = { ...todos.find((todo) => todo._id === id), completed };
        if (!newDoc) return;
        todoApi.update(newDoc, (e: IMeteorError) => {
            if (e) return showNotification({
                type: 'error',
                title: 'Erro ao alterar status',
                message: `Erro ao realizar a operação: api ${e.reason}`
            });

            showNotification({
                type: 'success',
                title: 'Status alterado!',
                message: `Status da tarefa alterado para ${completed === 'completed' ? 'Concluído' : 'Pendente'}`
            });

        });
    }, [todos, showNotification]);



    const onEditTodo = (id?: string) => {
        showDialog({
            sx: { borderRadius: sysSizing.radiusMd },
            children: <TodoDetailController id={id} mode="edit" component="dialog" />
        });
    }

    const onDeleteTodo = (id?: string) => {

        showDialog({
            sx: { borderRadius: sysSizing.radiusMd, },
            children: <TodoDeleteController id={id} />
        });
    }

    const onShowDetailTodo = (id?: string) => {
        if (!id) return;
        showDrawer({
            anchor: 'right',
            sx: { borderRadius: sysSizing.radiusMd },
            children: <TodoDetailController id={id} mode="view" component="drawer" />
        });
    };


    const providerValues = useMemo(() => ({
        user,
        todos,
        tabValue,
        loading,
        closePage,
        handleChangeTab,
        onCreateTodo,
        closeDialog,
        onShowDetailTodo,
        onChangeCompleted,
        onDeleteTodo,
        onEditTodo,
        search,
        handleChangeSearch
    }), [tabValue, todos, user]);

    return (
        <UserTodoListControllerContext.Provider value={providerValues}>
            <UserTodoListView />
        </UserTodoListControllerContext.Provider>
    );
};

export default UserTodoListController;
