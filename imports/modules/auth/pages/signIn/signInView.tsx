import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import AuthContext, { IAuthContext } from "/imports/app/authProvider/authContext";

import { Box, Typography } from "@mui/material";
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
        signIn(email, password, {
            onSuccess: () => {
                navigate('/');
                showNotification({
                    type: 'success',
                    title: 'Logado com sucesso',
                    message: 'Bem-vindo(a)!',
                });
            },
            onError: (error) => {
                if (error instanceof Meteor.Error) {
                    showNotification({
                        type: 'error',
                        title: 'Erro ao logar',
                        message: error.details || "Erro ao logar",
                    });
                } else {
                    showNotification({
                        type: 'error',
                        title: 'Erro ao logar',
                        message: error.message || 'Erro ao logar',
                    });
                }
            }
        });
    };

    return (
        <styles.Container>
            <Typography variant="h6" textAlign='center' color="gray" mb={6} >Boas-vindas a sua lista de tarefas. <br />
                Insira seu e-mail e senha para efetuar o login:</Typography>
            <SysForm schema={signInSchema} onSubmit={handleSubmit} debugAlerts={false}>
                <styles.FormWrapper>
                    <SysTextField name="email" label="Email" fullWidth placeholder="Digite seu email" />
                    <SysTextField label="Senha" fullWidth name="password" placeholder="Digite sua senha" type="password" />
                    <Box />
                    <SysFormButton variant="contained" color="primary" endIcon={<SysIcon name={'arrowForward'} />}>
                        Entrar
                    </SysFormButton>
                </styles.FormWrapper>
            </SysForm>
            <Typography mt={6} variant="body2" color="GrayText" >Esqueceu sua senha? {" "}
                <Typography component={Link} to="/password-recovery" variant="body2" color="primary">Recuperar Senha</Typography>
            </Typography>
            <Typography mt={2} variant="body2" color="GrayText" >Novo por aqui? {" "}
                <Typography component={Link} to="/signup" variant="body2" color="primary">Cadastre-se</Typography>
            </Typography>
        </styles.Container>
    );
};

export default SignInView;