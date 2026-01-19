import { useTracker } from "meteor/react-meteor-data";
import React, { useCallback, useContext } from "react";
import { todoApi } from "../../api/todoApi";
import TodoDeleteView from "./todoDeleteView";
import AppLayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";
import { ITodo } from "/imports/modules/todos/api/todoSch";
import { IMeteorError } from "/imports/typings/IMeteorError";

export interface ITodoDeleteControllerContext {
    closeDialog: () => void;
    onDelete: () => void;
    doc: ITodo;
    loading: boolean;
}

interface ITodoDeleteController {
    id?: string;
}

export const TodoDeleteControllerContext = React.createContext<ITodoDeleteControllerContext>(
    {} as ITodoDeleteControllerContext
);

const TodoDeleteController: React.FC<ITodoDeleteController> = ({ id }) => {
    const { closeDialog, showNotification } = useContext<IAppLayoutContext>(AppLayoutContext);

    const { loading, todoDetail } = useTracker(() => {
        if (!id) return { loading: false, todoDetail: {} as ITodo };
        const filter = {
            _id: id
        }
        const subHandle = todoApi.subscribe('todoDetail', filter);
        const todoDetail = subHandle?.ready() ? todoApi.findOne(filter) : {};
        return {
            todoDetail: todoDetail as ITodo,
            loading: !!subHandle && !subHandle.ready(),
        };
    }, [id]);


    const onDelete = useCallback(() => {
        todoApi.remove(todoDetail, (e: IMeteorError) => {
            if (e) return showNotification({
                type: 'error',
                title: 'Operação não realizada!',
                message: `Erro ao realizar a operação: api ${e.reason}`
            });
            closeDialog();
            showNotification({
                type: 'success',
                title: 'Operação realizada!',
                message: `A tarefa foi excluída com sucesso!`
            });
        });
    }, [showNotification, todoDetail]);

    return (
        <TodoDeleteControllerContext.Provider value={{
            closeDialog,
            onDelete,
            loading,
            doc: todoDetail,
        }}>
            <TodoDeleteView />
        </TodoDeleteControllerContext.Provider>
    );
};

export default TodoDeleteController;
