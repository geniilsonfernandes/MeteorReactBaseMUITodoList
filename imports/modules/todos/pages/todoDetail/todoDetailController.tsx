import { useTracker } from "meteor/react-meteor-data";
import React, { useCallback, useContext } from "react";
import { todoApi } from "../../api/todoApi";
import TodoDeleteController from "../todoDelete/todoDeleteController";
import TodoDetailView from "./todoDetailView";
import AppLayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";
import { ITodo } from "/imports/modules/todos/api/todoSch";
import { IMeteorError } from "/imports/typings/IMeteorError";
import { ISchema } from "/imports/typings/ISchema";
import { sysSizing } from "/imports/ui/materialui/styles";

export interface ITodoDetailControllerContext {
    closeDialog: () => void;
    closeDrawer: () => void;
    onSubmit: (doc: ITodo) => void;
    onChangeFormMode: (mode: 'view' | 'edit' | 'create') => void;
    onChangeViewMode: (mode: 'view' | 'edit' | 'create') => void;
    onChangeCompleted: (completed: "pending" | "completed") => void;
    onDeleteTodo: (id?: string) => void;
    schema: ISchema<ITodo>;
    doc: ITodo;
    loading: boolean;
    formMode: 'create' | 'edit' | 'view';
    viewMode: 'create' | 'edit' | 'view';
    component: "dialog" | "drawer";
}

interface ITodoDetailController {
    mode: 'create' | 'edit' | 'view';
    component: "dialog" | "drawer";
    id?: string;
    isOwner?: boolean;
}

export const TodoDetailControllerContext = React.createContext<ITodoDetailControllerContext>(
    {} as ITodoDetailControllerContext
);

const TodoDetailController: React.FC<ITodoDetailController> = ({ mode, id, component, isOwner }) => {

    const [viewMode, setViewMode] = React.useState<ITodoDetailController['mode']>(mode);
    const [formMode, setFormMode] = React.useState<ITodoDetailController['mode']>(mode);

    const { closeDialog, showNotification, closeDrawer, showDialog } = useContext<IAppLayoutContext>(AppLayoutContext);

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

            console.log('component', component);
            if (component === 'dialog') closeDialog();
            if (component === 'drawer') onChangeFormMode('view');
            showNotification({
                type: 'success',
                title: 'Operação realizada!',
                message: `A tarefa foi ${formMode === 'create' ? 'cadastrada' : 'atualizada'} com sucesso!`
            });
        });
    }, [formMode, showNotification, component]);


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



    const onDeleteTodo = (id?: string) => {
        closeDrawer();
        showDialog({
            sx: { borderRadius: sysSizing.radiusMd, },
            children: <TodoDeleteController id={id} />
        });
    }



    const onChangeFormMode = (mode: ITodoDetailController['mode']) => setFormMode(mode);
    const onChangeViewMode = (mode: ITodoDetailController['mode']) => setViewMode(mode);



    return (
        <TodoDetailControllerContext.Provider value={{
            closeDialog,
            closeDrawer,
            onSubmit: onCreateOrUpdate,
            onChangeFormMode,
            onChangeViewMode,
            onChangeCompleted,
            onDeleteTodo,
            schema: todoApi.getSchema(),
            loading,
            doc: todoDetail,
            viewMode,
            formMode,
            component

        }}>
            <TodoDetailView />
        </TodoDetailControllerContext.Provider>
    );
};

export default TodoDetailController;
