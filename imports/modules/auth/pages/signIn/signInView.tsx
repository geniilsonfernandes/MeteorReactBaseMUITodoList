import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import AuthContext, { IAuthContext } from "/imports/app/authProvider/authContext";

import { Box, Button, Typography } from "@mui/material";
import { signInSchema } from "./signinsch";
import styles from "./signInStyles";
import SysForm from "/imports/ui/components/sysForm/sysForm";
import SysFormButton from "/imports/ui/components/sysFormFields/sysFormButton/sysFormButton";
import SysTextField from "/imports/ui/components/sysFormFields/sysTextField/sysTextField";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";



const SignInView: React.FC = () => {
    const { showNotification } = useContext(AppLayoutContext);
    const { user, signIn } = useContext<IAuthContext>(AuthContext);
    const navigate = useNavigate();


    const handleSubmit = ({ email, password }: { email: string; password: string }) => {
        signIn(email, password, (err) => {
            if (!err) navigate('/');
            showNotification({
                type: 'error',
                title: 'Erro ao tentar logar',
                message: 'Email ou senha inválidos',
            });
        });
        ;
    };

    return (
        <styles.Container>
            <SysForm schema={signInSchema} onSubmit={handleSubmit} debugAlerts={false}>
                <styles.FormWrapper>
                    <SysTextField name="email" label="Email" fullWidth placeholder="Digite seu email" />
                    <SysTextField label="Senha" fullWidth name="password" placeholder="Digite sua senha" type="password" />
                    <Button variant="text" sx={{ alignSelf: 'flex-end' }} onClick={() => { }}>
                        <Typography variant="link">Esqueci minha senha</Typography>
                    </Button>
                    <Box />
                    <SysFormButton variant="contained" color="primary" endIcon={<SysIcon name={'arrowForward'} />}>
                        Entrar
                    </SysFormButton>
                </styles.FormWrapper>
            </SysForm>
        </styles.Container>
    );
};

export default SignInView;