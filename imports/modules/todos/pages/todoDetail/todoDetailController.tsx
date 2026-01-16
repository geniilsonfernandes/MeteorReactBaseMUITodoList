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
}

interface ITodoDetailController {
    mode: 'create' | 'edit' | 'read';
    id?: string;
}

export const TodoDetailControllerContext = React.createContext<ITodoDetailControllerContext>(
    {} as ITodoDetailControllerContext
);

const TodoDetailController: React.FC<ITodoDetailController> = ({ mode, id }) => {
    const { closeDialog, showNotification } = useContext<IAppLayoutContext>(AppLayoutContext);


    const onSubmit = useCallback((doc: ITodo) => {
        console.log('doc', doc);


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
            loading: false,
            onSubmit,
            todo: {
                title: '',
                description: '',
                completed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                owner: '',
                team: '',
                assignee: '',
            }
        }}>
            <TodoDetailView />
        </TodoDetailControllerContext.Provider>
    );
};

export default TodoDetailController;
