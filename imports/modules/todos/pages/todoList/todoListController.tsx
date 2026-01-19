import { useTracker } from "meteor/react-meteor-data";
import React, { useContext, useMemo } from "react";
import { todoApi } from "../../api/todoApi";
import { ITodo } from "../../api/todoSch";
import TodoListView from "./todoListView";
import AuthContext from "/imports/app/authProvider/authContext";
import { IUserProfile } from "/imports/modules/userprofile/api/userProfileSch";


export interface ITodoListControllerContext {
    user: IUserProfile | undefined
    todos: ITodo[]
    loading: boolean
}

export const TodoListControllerContext = React.createContext<ITodoListControllerContext>(
    {} as ITodoListControllerContext
);

const TodoListController: React.FC = () => {
    const { user } = useContext(AuthContext);
    const filter = {};
    const { loading, todos } = useTracker(() => {
        const subHandle = todoApi.subscribe('todoList', filter);
        const todos = subHandle?.ready() ? todoApi.find({}).fetch() : [];
        return {
            todos,
            loading: !!subHandle && !subHandle.ready(),
        };
    }, []);

    const providerValues = useMemo(() => ({
        user,
        todos,
        loading,
    }), [user, todos, loading]);

    return (
        <TodoListControllerContext.Provider value={providerValues}>
            <TodoListView />
        </TodoListControllerContext.Provider>
    );
};

export default TodoListController;
