import { Box, Typography } from "@mui/material";
import { GridCheckCircleIcon } from "@mui/x-data-grid";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { signUpSchema } from "./signUpsch";
import styles from "./signUpStyles";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import AuthContext, { IAuthContext } from "/imports/app/authProvider/authContext";
import SysForm from "/imports/ui/components/sysForm/sysForm";
import SysFormButton from "/imports/ui/components/sysFormFields/sysFormButton/sysFormButton";
import SysTextField from "/imports/ui/components/sysFormFields/sysTextField/sysTextField";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";



const SignUpView: React.FC = () => {
    const { showNotification } = useContext(AppLayoutContext);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const { signUp } = useContext<IAuthContext>(AuthContext);


    const handleSubmit = ({ user, email, password }: { user: string, email: string; password: string }) => {
        signUp(user, email, password, {
            onSuccess: () => {
                setIsSuccess(true);
                showNotification({
                    type: 'success',
                    title: 'Cadastrado com sucesso, ',
                    message: 'verifique seu email para confirmar a conta!',
                });
            },
            onError: (error) => {
                if (error instanceof Meteor.Error) {
                    showNotification({
                        type: 'error',
                        title: 'Erro ao tentar cadastrar',
                        message: error.details || "Erro ao tentar cadastrar",
                    });
                } else {
                    showNotification({
                        type: 'error',
                        title: 'Erro ao tentar cadastrar',
                        message: error.message || 'Erro ao tentar cadastrar',
                    });
                }
            }
        });
    };

    return (
        <styles.Container>

            {!isSuccess &&
                <Box>
                    <Typography variant="h6" textAlign="center" color="gray" mb={6}>
                        Cadastre-se, insira seus dados abaixo:
                    </Typography>

                    <SysForm schema={signUpSchema} onSubmit={handleSubmit} debugAlerts={false}>
                        <styles.FormWrapper>
                            <SysTextField name="user" label="Usuário" fullWidth placeholder="Digite seu usuário" />
                            <SysTextField name="email" label="Email" fullWidth placeholder="Digite seu email" />
                            <SysTextField name="password" label="Senha" fullWidth type="password" placeholder="Digite sua senha" />
                            <SysTextField name="confirmPassword" label="Confirmar Senha" fullWidth type="password" placeholder="Digite sua senha" />
                            <Box />
                            <SysFormButton
                                variant="contained"
                                color="primary"
                                endIcon={<SysIcon name="arrowForward" />}
                            >
                                Cadastrar
                            </SysFormButton>
                        </styles.FormWrapper>
                    </SysForm>
                </Box>}
            {isSuccess &&
                <Box textAlign="center">
                    <GridCheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />

                    <Typography variant="h6" color="gray" mb={2}>
                        Cadastro concluído!
                    </Typography>

                    <Typography variant="body2" color="GrayText">
                        Verifique seu email para confirmar a conta.
                    </Typography>
                </Box>}

            <Typography mt={6} variant="body2" color="GrayText">
                Já tem uma conta?{" "}
                <Typography component={Link} to="/" variant="body2" color="primary">
                    Entrar
                </Typography>
            </Typography>

        </styles.Container>
    );
};

export default SignUpView;