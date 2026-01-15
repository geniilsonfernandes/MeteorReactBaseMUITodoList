


import React, { useContext, useMemo } from "react";
import TodoDetailView from "./todoDetailView";
import AppLayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";

export interface ITodoDetailControllerContext {
    closeDialog: () => void;
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

    const providerValues = useMemo(() => ({
        closeDialog,
    }), []);

    return (
        <TodoDetailControllerContext.Provider value={providerValues}>
            <TodoDetailView />
        </TodoDetailControllerContext.Provider>
    );
};

export default TodoDetailController;
