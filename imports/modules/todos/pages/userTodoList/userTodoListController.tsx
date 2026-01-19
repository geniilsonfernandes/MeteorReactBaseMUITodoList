import { useTracker } from "meteor/react-meteor-data";
import { nanoid } from "nanoid";
import React, { useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { todoApi } from "../../api/todoApi";
import { ITodo } from "../../api/todoSch";
import TodoDetailController from "../todoDetail/todoDetailController";
import UserTodoListView from "./userTodoListView";
import AppLayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";
import AuthContext from "/imports/app/authProvider/authContext";
import { sysSizing } from "/imports/ui/materialui/styles";


export enum UserTodoListTab {
    MinhasTarefas = 'minhas_tarefas',
    TarefasDoTime = 'tarefas_do_time'
}

export interface IUserTodoListControllerContext {
    closePage: () => void
    tabValue: UserTodoListTab
    handleChangeTab: (newValue: UserTodoListTab) => void
    onNewTodoButtonClick: () => void
    closeDialog: () => void
    onShowDetailTodo: (id?: string) => void

    // 
    todos: ITodo[]
    loading: boolean
}

export const UserTodoListControllerContext = React.createContext<IUserTodoListControllerContext>(
    {} as IUserTodoListControllerContext
);

const UserTodoListController: React.FC = () => {
    const { showDialog, closeDialog, showDrawer } = useContext<IAppLayoutContext>(AppLayoutContext);
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const closePage = useCallback(() => navigate(-1), []);

    const [tabValue, setTabValue] = React.useState(UserTodoListTab.MinhasTarefas);

    const handleChangeTab = (newValue: UserTodoListTab) => {
        setTabValue(newValue);
    };

    const onNewTodoButtonClick = () => {
        showDialog({
            sx: { borderRadius: sysSizing.radiusMd },
            children: <TodoDetailController id={nanoid()} mode="create" />
        });
    };

    const onShowDetailTodo = (id?: string) => {

        console.log("onShowDetailTodo id", id);

        if (!id) return;
        showDrawer({
            anchor: 'right',
            sx: { borderRadius: sysSizing.radiusMd },
            children: <TodoDetailController id={id} mode="view" />
        });
    };


    const { loading, todos } = useTracker(() => {
        const filter = {
            owner: user?._id
        }

        const subHandle = todoApi.subscribe('todoList', filter);
        const todos = subHandle?.ready() ? todoApi.find(filter).fetch() : [];
        return {
            todos,
            loading: !!subHandle && !subHandle.ready(),
        };
    }, [user]);


    const providerValues = useMemo(() => ({
        user,
        closePage,
        tabValue,
        handleChangeTab,
        onNewTodoButtonClick,
        closeDialog,
        onShowDetailTodo,
        todos,
        loading
    }), [tabValue, todos, user]);

    return (
        <UserTodoListControllerContext.Provider value={providerValues}>
            <UserTodoListView />
        </UserTodoListControllerContext.Provider>
    );
};

export default UserTodoListController;
