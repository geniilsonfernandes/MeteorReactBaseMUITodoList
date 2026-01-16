import React, { useCallback, useContext } from "react";
import { todoApi } from "../../api/todoApi";
import TodoDetailView from "./todoDetailView";
import AppLayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";
import { ITodo } from "/imports/modules/todos/api/todoSch";
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
    const { closeDialog } = useContext<IAppLayoutContext>(AppLayoutContext);


    const onSubmit = useCallback((doc: ITodo) => {
        console.log(doc);
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
            }
        }}>
            <TodoDetailView />
        </TodoDetailControllerContext.Provider>
    );
};

export default TodoDetailController;
