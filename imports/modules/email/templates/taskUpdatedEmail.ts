import { ITodo } from "../../todos/api/todoSch";

export function buildTaskUpdatedEmail(docObj: ITodo) {
    return {
        subject: `Tarefa atualizada: ${docObj.title}`,

        html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #eee; border-radius:8px;">
        
        <h2 style="color:#1976d2; margin-bottom:10px;">
          ✏️ Tarefa atualizada
        </h2>

        <p>Olá!</p>

        <p>A seguinte tarefa foi atualizada:</p>

        <div style="background:#f9f9f9; padding:15px; border-radius:6px; margin:15px 0;">
          <p><strong>Título:</strong> ${docObj.title}</p>
          <p><strong>Descrição:</strong> ${docObj.description || "Sem descrição"}</p>
          <p><strong>Status:</strong> ${docObj.completed ? "Concluída ✅" : "Pendente ⏳"}</p>
        </div>

        <p>Entre no sistema para ver mais detalhes.</p>

        <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />

        <p style="font-size:12px; color:#777;">
          Este é um e-mail automático. Não responda.
        </p>
      </div>
    `,
    };
}