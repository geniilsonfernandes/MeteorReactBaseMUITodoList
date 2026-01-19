import { useTracker } from "meteor/react-meteor-data";
import React, { useCallback, useContext, useRef } from "react";
import { todoApi } from "../../api/todoApi";
import { ITodo } from "../../api/todoSch";
import TodoDeleteController from "../todoDelete/todoDeleteController";
import TodoDetailController from "../todoDetail/todoDetailController";
import TodoListView from "./todoListView";
import AppLayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";
import AuthContext from "/imports/app/authProvider/authContext";
import { IUserProfile } from "/imports/modules/userprofile/api/userProfileSch";
import { IMeteorError } from "/imports/typings/IMeteorError";
import { sysSizing } from "/imports/ui/materialui/styles";


export interface ITodoListControllerContext {
    onEditTodo: (id?: string) => void
    onDeleteTodo: (id?: string) => void
    onShowDetailTodo: (id?: string) => void
    onChangeCompleted: (id?: string, completed?: "pending" | "completed") => void

    user: IUserProfile | undefined
    todos: ITodo[]
    loading: boolean
}

export const TodoListControllerContext = React.createContext<ITodoListControllerContext>(
    {} as ITodoListControllerContext
);

const TodoListController: React.FC = () => {
    const { showDialog, showDrawer, showNotification } = useContext<IAppLayoutContext>(AppLayoutContext);
    const { user } = useContext(AuthContext);

    const lastTodosRef = useRef<ITodo[]>([]);

    const { loading, todos } = useTracker(() => {
        const filter = {};

        const options = {
            sort: { createdat: -1 },
            limit: 5
        };

        const subHandle = todoApi.subscribe('todoList', filter, options);

        if (!subHandle || !subHandle.ready()) {
            return { loading: true, todos: lastTodosRef.current };
        }

        const data = todoApi.find(filter, options).fetch();
        lastTodosRef.current = data;

        return { loading: false, todos: data };
    }, []);

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


    const onChangeCompleted = useCallback((id?: string, completed?: "pending" | "completed") => {
        if (!id || !completed) return;
        const todoData = lastTodosRef.current.find((t) => t._id === id);
        if (!todoData) return;
        const newDoc = { ...todoData, completed };
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
    }, [lastTodosRef.current, showNotification]);

    const memoTodos = React.useMemo(() => todos, [lastTodosRef.current]);



    return (
        <TodoListControllerContext.Provider value={{
            todos: memoTodos,
            loading,
            user,
            onEditTodo,
            onDeleteTodo,
            onShowDetailTodo,
            onChangeCompleted
        }}>
            <TodoListView />
        </TodoListControllerContext.Provider>
    );
};

export default TodoListController;
