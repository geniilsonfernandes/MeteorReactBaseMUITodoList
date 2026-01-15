import React, { useContext, useMemo } from "react";
import TodoListView from "./todoListView";
import AuthContext from "/imports/app/authProvider/authContext";
import { IUserProfile } from "/imports/modules/userprofile/api/userProfileSch";

interface ITodoListControllerContext {
    user: IUserProfile | undefined
}

export const TodoListControllerContext = React.createContext<ITodoListControllerContext>(
    {} as ITodoListControllerContext
);

const TodoListController: React.FC = () => {
    const { user } = useContext(AuthContext);

    const providerValues = useMemo(() => ({
        user,
    }), [user]);

    return (
        <TodoListControllerContext.Provider value={providerValues}>
            <TodoListView />
        </TodoListControllerContext.Provider>
    );
};

export default TodoListController;
