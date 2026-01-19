import { useTracker } from "meteor/react-meteor-data";
import React, { useCallback, useContext } from "react";
import { todoApi } from "../../api/todoApi";
import TodoDetailView from "./todoDetailView";
import AppLayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";
import { ITodo } from "/imports/modules/todos/api/todoSch";
import { IMeteorError } from "/imports/typings/IMeteorError";
import { ISchema } from "/imports/typings/ISchema";

export interface ITodoDetailControllerContext {
    closeDialog: () => void;
    schema: ISchema<ITodo>;
    todo: ITodo;
    onSubmit: (doc: ITodo) => void;
    loading: boolean;
    mode: 'create' | 'edit' | 'view';
}

interface ITodoDetailController {
    mode: 'create' | 'edit' | 'view';
    id?: string;
}

export const TodoDetailControllerContext = React.createContext<ITodoDetailControllerContext>(
    {} as ITodoDetailControllerContext
);

const TodoDetailController: React.FC<ITodoDetailController> = ({ mode, id }) => {

    const { closeDialog, showNotification } = useContext<IAppLayoutContext>(AppLayoutContext);

    const { loading, todoDetail } = useTracker(() => {
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


    const onSubmit = useCallback((doc: ITodo) => {
        todoApi.insert(doc, (e: IMeteorError) => {
            if (e) return showNotification({
                type: 'error',
                title: 'Operação não realizada!',
                message: `Erro ao realizar a operação: api ${e.reason}`
            });
            closeDialog();
            showNotification({
                type: 'success',
                title: 'Operação realizada!',
                message: `A tarefa foi cadastrada com sucesso!`
            });
        });
    }, []);






    return (
        <TodoDetailControllerContext.Provider value={{
            closeDialog,
            schema: todoApi.getSchema(),
            loading,
            onSubmit,
            todo: todoDetail,
            mode
        }}>
            <TodoDetailView />
        </TodoDetailControllerContext.Provider>
    );
};

export default TodoDetailController;
