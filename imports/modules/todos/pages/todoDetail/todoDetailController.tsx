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
    onChangeCompleted: (completed: "pending" | "completed") => void;
}

interface ITodoDetailController {
    mode: 'create' | 'edit' | 'view';
    id?: string;
}

export const TodoDetailControllerContext = React.createContext<ITodoDetailControllerContext>(
    {} as ITodoDetailControllerContext
);

const TodoDetailController: React.FC<ITodoDetailController> = ({ mode, id }) => {

    const [viewMode, setViewMode] = React.useState<ITodoDetailController['mode']>(mode);
    const [formMode, setFormMode] = React.useState<ITodoDetailController['mode']>(mode);

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


    const onCreateOrUpdate = useCallback((doc: ITodo) => {
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
            formMode === 'create' ? closeDialog() : onChangeFormMode('view');
            showNotification({
                type: 'success',
                title: 'Operação realizada!',
                message: `A tarefa foi ${formMode === 'create' ? 'cadastrada' : 'atualizada'} com sucesso!`
            });
        });
    }, [formMode, showNotification]);


    const onChangeCompleted = useCallback((completed: "pending" | "completed") => {
        const newDoc = { ...todoDetail, completed };
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
    }, [todoDetail, showNotification]);



    const onChangeFormMode = (mode: ITodoDetailController['mode']) => {
        setFormMode(mode);
    }

    const onChangeViewMode = (mode: ITodoDetailController['mode']) => {
        setViewMode(mode);
    }



    return (
        <TodoDetailControllerContext.Provider value={{
            closeDialog,
            closeDrawer,
            schema: todoApi.getSchema(),
            loading,
            onSubmit: onCreateOrUpdate,
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
