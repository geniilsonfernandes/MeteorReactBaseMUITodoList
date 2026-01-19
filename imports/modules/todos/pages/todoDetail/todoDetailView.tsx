import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, Checkbox, IconButton, Stack } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useContext, useRef } from 'react';
import { ISysFormRef } from '../../../../ui/components/sysForm/typings';
import SysFormButton from '../../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysTextField from '../../../../ui/components/sysFormFields/sysTextField/sysTextField';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import TodoItemMenu from '../../components/TodoItemMenu';
import { ITodoDetailControllerContext, TodoDetailControllerContext } from './todoDetailController';
import styles from './todoDetailStyles';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';

const TodoDetailView = () => {
    const sysFormRef = useRef<ISysFormRef>(null);
    const { closeDrawer, closeDialog, schema, doc, onSubmit, loading, viewMode, formMode, onChangeFormMode, onChangeCompleted } = useContext<ITodoDetailControllerContext>(TodoDetailControllerContext);

    const modeHeaderTitle = {
        "view": "",
        "edit": "Editar Tarefa",
        "create": "Criar Tarefa"
    }

    if (loading) return <styles.Container>
        <styles.DialogTitleContainer>
            <DialogTitle variant="subtitle1" sx={{ padding: 0 }}>
                {modeHeaderTitle[viewMode]}
            </DialogTitle>
            <Stack direction="row" spacing={1} alignItems="center">
                <IconButton onClick={viewMode === 'view' ? closeDrawer : closeDialog}>
                    <SysIcon name="close" />
                </IconButton>
            </Stack>
        </styles.DialogTitleContainer>
    </styles.Container>

    return (
        <styles.Container>
            <styles.DialogTitleContainer>
                <DialogTitle variant="subtitle1" sx={{ padding: 0 }}>
                    {modeHeaderTitle[viewMode]}
                </DialogTitle>
                <Stack direction="row" spacing={1} alignItems="center">
                    {viewMode === 'view' && <TodoItemMenu onEdit={() => onChangeFormMode('edit')} onDelete={() => { }} />}
                    <IconButton onClick={viewMode === 'view' ? closeDrawer : closeDialog}>
                        <SysIcon name="close" />
                    </IconButton>
                </Stack>
            </styles.DialogTitleContainer>
            <SysForm schema={schema} doc={doc} mode={formMode} onSubmit={onSubmit} ref={sysFormRef} loading={loading} >
                <styles.FieldsForm>
                    {formMode !== 'edit' && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Checkbox
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                            checked={doc.completed === "completed"}
                            onChange={(e) => onChangeCompleted(e.target.checked ? "completed" : "pending")}
                            sx={{ p: 0 }}
                        />
                        <styles.Title isCompleted={doc.completed === "completed"}>{doc.title}</styles.Title>
                    </Box>}
                    <Box sx={{ display: formMode === 'edit' ? 'flex' : 'none' }}>
                        <SysTextField name="title" placeholder="Digite o título da tarefa" />
                    </Box>
                    <SysTextField name="description" placeholder="Digite a descrição da tarefa" multiline rows={6} />
                    <SysSelectField name="completed" placeholder="Selecionar" />
                    <styles.Actions>
                        <SysFormButton startIcon={<SysIcon name={'check'} />}>Salvar</SysFormButton>
                    </styles.Actions>
                </styles.FieldsForm>
            </SysForm>
            {formMode === 'view' && <Stack direction="row" spacing={1} justifyContent="center">
                <SysFormButton onClick={() => onChangeFormMode('edit')} startIcon={<SysIcon name={'edit'} />}>Editar</SysFormButton>
            </Stack>}
        </styles.Container>
    );
};

export default TodoDetailView;
