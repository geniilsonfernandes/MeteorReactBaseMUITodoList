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
    closeDrawer: () => void;
    schema: ISchema<ITodo>;
    doc: ITodo;
    onSubmit: (doc: ITodo) => void;
    loading: boolean;
    onChangeFormMode: (mode: 'view' | 'edit' | 'create') => void;
    onChangeViewMode: (mode: 'view' | 'edit' | 'create') => void;
    viewMode: 'create' | 'edit' | 'view';
    formMode: 'create' | 'edit' | 'view';
}

interface ITodoDetailController {
    mode: 'create' | 'edit' | 'view';
    id?: string;
}

export const TodoDetailControllerContext = React.createContext<ITodoDetailControllerContext>(
    {} as ITodoDetailControllerContext
);

const TodoDetailController: React.FC<ITodoDetailController> = ({ mode, id }) => {

    const [viewMode, setViewMode] = React.useState<'create' | 'edit' | 'view'>(mode);
    const [formMode, setFormMode] = React.useState<'create' | 'edit' | 'view'>(mode);

    const { closeDialog, showNotification, closeDrawer } = useContext<IAppLayoutContext>(AppLayoutContext);

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
        const modes = {
            "create": todoApi.insert,
            "edit": todoApi.update,
            "view": todoApi.update
        }
        modes[formMode](doc, (e: IMeteorError) => {
            if (e) return showNotification({
                type: 'error',
                title: 'Operação não realizada!',
                message: `Erro ao realizar a operação: api ${e.reason}`
            });
            if (formMode === 'create') {
                closeDialog();
            }
            if (formMode !== 'create') {
                onChangeFormMode('view');
            }
            showNotification({
                type: 'success',
                title: 'Operação realizada!',
                message: `A tarefa foi ${formMode === 'create' ? 'cadastrada' : 'atualizada'} com sucesso!`
            });
        });
    }, [formMode]);


    const onChangeCompleted = useCallback((completed: "pending" | "completed") => {

    }, [id]);



    const onChangeFormMode = (mode: 'view' | 'edit' | 'create') => {
        setFormMode(mode);
    }

    const onChangeViewMode = (mode: 'view' | 'edit' | 'create') => {
        setViewMode(mode);
    }





    return (
        <TodoDetailControllerContext.Provider value={{
            closeDialog,
            closeDrawer,
            schema: todoApi.getSchema(),
            loading,
            onSubmit,
            doc: todoDetail,
            onChangeFormMode,
            onChangeViewMode,
            viewMode,
            formMode,
            onChangeCompleted

        }}>
            <TodoDetailView />
        </TodoDetailControllerContext.Provider>
    );
};

export default TodoDetailController;
