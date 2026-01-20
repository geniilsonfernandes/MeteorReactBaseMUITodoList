import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, Button, Checkbox, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useContext, useRef, useState } from 'react';
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
    const { closeDrawer, closeDialog, schema, doc, onSubmit, loading, viewMode, formMode, onChangeFormMode, onChangeCompleted, onDeleteTodo, component, users, loadingUsers } = useContext<ITodoDetailControllerContext>(TodoDetailControllerContext);

    const modeHeaderTitle = {
        "view": "",
        "edit": "Editar Tarefa",
        "create": "Criar Tarefa",
        "delete": "Excluir Tarefa"
    }



    const isOwner = doc?.isOwner;

    if (loading) return <styles.Container isDrawer={component === 'drawer'}>
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
        <Stack spacing={1} alignItems="center" justifyContent="center" minHeight="50vh">
            <CircularProgress />
            <Typography variant="body1">Aguarde, carregando informações...</Typography>
        </Stack>
    </styles.Container>




    return (
        <styles.Container aria-label="todo detail form" isDrawer={component === 'drawer'}>
            <styles.DialogTitleContainer aria-label="todo detail form title">
                <DialogTitle variant="subtitle1" sx={{ padding: 0 }}>
                    {modeHeaderTitle[viewMode]}
                </DialogTitle>
                <Stack direction="row" spacing={1} alignItems="center">
                    {viewMode === 'view' && isOwner && <TodoItemMenu onEdit={() => onChangeFormMode('edit')} onDelete={() => onDeleteTodo(doc._id)} />}
                    <IconButton onClick={viewMode === 'view' ? closeDrawer : closeDialog}>
                        <SysIcon name="close" />
                    </IconButton>
                </Stack>
            </styles.DialogTitleContainer>
            <SysForm schema={schema} doc={doc} mode={formMode} onSubmit={onSubmit} ref={sysFormRef} loading={loading} aria-label="todo detail form">
                <styles.FieldsForm aria-label="form fields">
                    {formMode === 'view' && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Checkbox
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                            checked={doc?.completed === "completed"}
                            disabled={!isOwner}
                            onChange={(e) => onChangeCompleted(e.target.checked ? "completed" : "pending")}
                            sx={{ p: 0 }}
                        />
                        <styles.Title isCompleted={doc?.completed === "completed"}>{doc?.title}</styles.Title>
                    </Box>}
                    <Box sx={{ display: formMode === 'view' ? 'none' : 'flex' }}>
                        <SysTextField
                            name="title" placeholder="Digite o título da tarefa" />
                    </Box>
                    <SysTextField
                        name="description" placeholder="Digite a descrição da tarefa" multiline rows={6} />
                    <SysSelectField name="completed" placeholder="Selecionar" />
                    {formMode !== 'view' && isOwner && <UserPrifileSelect />}
                    <styles.Actions>
                        <SysFormButton startIcon={<SysIcon name={'check'} />}>Salvar</SysFormButton>
                    </styles.Actions>
                </styles.FieldsForm>
            </SysForm>
            {formMode === 'view' && isOwner && <Stack direction="row" spacing={1} justifyContent="center">
                <SysFormButton onClick={() => onChangeFormMode('edit')} startIcon={<SysIcon name={'edit'} />}>Editar</SysFormButton>
            </Stack>}
            {component === 'drawer' && <Stack direction="row" spacing={1} justifyContent="flex-end" mt={"auto"}>
                <styles.Subtitle>Criada por: {isOwner ? 'Você' : doc?.owner_data?.username}</styles.Subtitle>
                <styles.Subtitle>Atribuída a: {isOwner ? 'Você' : doc?.assignee_data?.username}</styles.Subtitle>
            </Stack>}
        </styles.Container>
    );
};



const UserPrifileSelect = () => {
    const [show, setShow] = useState(false)
    const { users, loadingUsers, doc, onChangeAssignee } = useContext<ITodoDetailControllerContext>(TodoDetailControllerContext);


    if (!show) return <Button onClick={() => setShow(true)}>Atribuir tarefa para alguém</Button>

    return <Stack direction="row" spacing={1} alignItems="flex-end">
        <FormControl sx={{ width: '100%' }} >
            <InputLabel id="assignee">Atribuída a (opcional)</InputLabel>
            <Select name="assignee" placeholder="Selecionar"
                label="Atribuída a (opcional)"
                disabled={loadingUsers}
                defaultValue={doc?.assignee}
                onChange={(e) => onChangeAssignee(e.target.value)}

                sx={{ mt: 1 }}
                displayEmpty
            >
                {users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                        {user.email}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <Button onClick={() => {
            setShow(false)
            onChangeAssignee('')
        }} variant="outlined"><SysIcon name="close" /></Button>
    </Stack>
}



export default TodoDetailView;
