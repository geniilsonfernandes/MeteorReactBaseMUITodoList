import { Button, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useContext } from 'react';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import { ITodoDeleteControllerContext, TodoDeleteControllerContext } from './todoDeleteController';
import styles from './todoDeleteStyles';

const TodoDeleteView = () => {
    const { closeDialog, doc, loading, onDelete } = useContext<ITodoDeleteControllerContext>(TodoDeleteControllerContext);



    if (loading) return <styles.Container >
        <styles.DialogTitleContainer>
            <DialogTitle variant="subtitle1" sx={{ padding: 0 }}>
                Excluir Tarefa
            </DialogTitle>
            <Stack direction="row" spacing={1} alignItems="center">
                <IconButton onClick={closeDialog}>
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
        <styles.Container>
            <styles.DialogTitleContainer>
                <DialogTitle variant="subtitle1" sx={{ padding: 0 }}>
                    Excluir Tarefa
                </DialogTitle>
                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton onClick={closeDialog}>
                        <SysIcon name="close" />
                    </IconButton>
                </Stack>
            </styles.DialogTitleContainer>

            <Typography>Tem certeza que deseja excluir a tarefa <strong>{doc?.title}</strong>?</Typography>

            <styles.Actions>
                <Button variant="outlined" onClick={closeDialog}>Cancelar</Button>
                <Button variant="contained" color="error" onClick={onDelete} disabled={loading}>
                    {loading ? "Excluindo..." : "Excluir"}
                </Button>
            </styles.Actions>
        </styles.Container>
    );
};

export default TodoDeleteView;
