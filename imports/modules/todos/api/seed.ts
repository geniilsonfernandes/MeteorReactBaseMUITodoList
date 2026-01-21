import { ITodo } from "./todoSch";

export const seedTodos = (userId: string) => {
    const initTodos: ITodo[] = [
        {
            title: "👋 Bem-vindo à sua lista de tarefas",
            description: "Clique nesta tarefa para abrir os detalhes e explorar a plataforma.",
            completed: "pending",
            createdAt: new Date(),
            updatedAt: new Date(),
            createdat: new Date(),
            isCompleted: false,
            owner: userId,
            assignee: userId,
        },
        {
            title: "✏️ Editar ou remover uma tarefa ",
            description: "Use o menu de opções (⋮) para editar ou excluir uma tarefa.",
            completed: "pending",
            createdAt: new Date(),
            updatedAt: new Date(),
            createdat: new Date(),
            isCompleted: false,
            owner: userId,
            assignee: userId,
        },
        {
            title: "✅ Marcar tarefa como concluída",
            description: "Clique no botão de check para marcar esta tarefa como concluída.",
            completed: "in_progress",
            createdAt: new Date(),
            updatedAt: new Date(),
            createdat: new Date(),
            team: "1",
            isCompleted: false,
            owner: userId,
            assignee: userId,
        },
        {
            title: "👤 Veja quem criou a tarefa",
            description: "Na parte inferior da tela de detalhes você verá quem criou esta tarefa.",
            completed: "pending",
            createdAt: new Date(),
            updatedAt: new Date(),
            createdat: new Date(),
            team: "1",
            isCompleted: false,
            owner: userId,
            assignee: userId,
        }
    ];

    return initTodos;
}