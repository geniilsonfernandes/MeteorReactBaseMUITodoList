import { IconButton } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useContext, useRef } from 'react';
import { ISysFormRef } from '../../../../ui/components/sysForm/typings';
import SysFormButton from '../../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysTextField from '../../../../ui/components/sysFormFields/sysTextField/sysTextField';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import { ITodoDetailControllerContext, TodoDetailControllerContext } from './todoDetailController';
import TodoDetailStyles from './todoDetailStyles';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';

const TodoDetailView = () => {
    const { closeDialog, schema, todo, onSubmit, loading, mode } = useContext<ITodoDetailControllerContext>(TodoDetailControllerContext);

    const sysFormRef = useRef<ISysFormRef>(null);
    const { Container, FieldsForm, Actions, DialogTitleContainer } = TodoDetailStyles;

    const modes = {
        "view": "visualizar",
        "edit": "editar",
        "create": "criar"
    }
    return (
        <Container>
            <DialogTitleContainer>
                <DialogTitle variant="subtitle1" sx={{ padding: 0 }}>
                    {modes[mode]}
                </DialogTitle>
                <IconButton onClick={closeDialog}>
                    <SysIcon name="close" />
                </IconButton>
            </DialogTitleContainer>
            <SysForm schema={schema} doc={todo} mode={mode} onSubmit={onSubmit} ref={sysFormRef} loading={loading} >
                <FieldsForm>
                    <SysTextField name="title" placeholder="Digite o título da tarefa" />
                    <SysTextField name="description" placeholder="Digite a descrição da tarefa" multiline rows={6} />
                    <SysSelectField name="completed" placeholder="Selecionar" />
                    <Actions>
                        <SysFormButton startIcon={<SysIcon name={'check'} />}>Salvar</SysFormButton>
                    </Actions>
                </FieldsForm>
            </SysForm>
        </Container>
    );
};

export default TodoDetailView;
